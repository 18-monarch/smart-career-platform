package com.smartcareer.platform.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.smartcareer.platform.dto.codingtracker.CodeforcesStats;
import com.smartcareer.platform.dto.codingtracker.CodingSubmission;
import com.smartcareer.platform.dto.codingtracker.CodingTrackerResponse;
import com.smartcareer.platform.dto.codingtracker.LeetCodeStats;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.CompletableFuture;

@Service
public class ExternalCodingTrackerService {

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    public ExternalCodingTrackerService(RestTemplate restTemplate, ObjectMapper objectMapper) {
        this.restTemplate = restTemplate;
        this.objectMapper = objectMapper;
    }

    public CodingTrackerResponse fetchCodingStats(String leetcodeUsername, String codeforcesHandle) {
        CompletableFuture<LeetCodeStats> leetcodeFuture =
                CompletableFuture.supplyAsync(() -> fetchLeetcodeStats(leetcodeUsername));

        CompletableFuture<CodeforcesStats> codeforcesFuture =
                CompletableFuture.supplyAsync(() -> fetchCodeforcesStats(codeforcesHandle));

        CompletableFuture.allOf(leetcodeFuture, codeforcesFuture).join();

        try {
            return new CodingTrackerResponse(leetcodeFuture.get(), codeforcesFuture.get());
        } catch (Exception e) {
            return new CodingTrackerResponse(new LeetCodeStats(), new CodeforcesStats());
        }
    }

    private LeetCodeStats fetchLeetcodeStats(String username) {
        LeetCodeStats stats = new LeetCodeStats();

        if (username == null || username.trim().isEmpty()) {
            return stats;
        }

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            String query =
                    "query getUserProfile($username: String!) { " +
                            "  matchedUser(username: $username) { " +
                            "    submitStatsGlobal { " +
                            "      acSubmissionNum { difficulty count } " +
                            "    } " +
                            "    profile { ranking } " +
                            "  } " +
                            "  recentAcSubmissionList(username: $username, limit: 10) { " +
                            "    title " +
                            "    timestamp " +
                            "  } " +
                            "}";

            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("query", query);
            requestBody.put("variables", Collections.singletonMap("username", username));

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

            String response = restTemplate.postForObject(
                    "https://leetcode.com/graphql",
                    entity,
                    String.class
            );

            if (response != null) {
                JsonNode root = objectMapper.readTree(response);
                JsonNode data = root.path("data");
                JsonNode matchedUser = data.path("matchedUser");

                JsonNode acNum = matchedUser.path("submitStatsGlobal").path("acSubmissionNum");
                if (acNum.isArray()) {
                    for (JsonNode node : acNum) {
                        String difficulty = node.path("difficulty").asText("");
                        int count = node.path("count").asInt(0);

                        if ("All".equalsIgnoreCase(difficulty)) {
                            stats.setTotalSolved(count);
                        } else if ("Easy".equalsIgnoreCase(difficulty)) {
                            stats.setEasy(count);
                        } else if ("Medium".equalsIgnoreCase(difficulty)) {
                            stats.setMedium(count);
                        } else if ("Hard".equalsIgnoreCase(difficulty)) {
                            stats.setHard(count);
                        }
                    }
                }

                JsonNode rankNode = matchedUser.path("profile").path("ranking");
                if (!rankNode.isMissingNode() && !rankNode.isNull()) {
                    stats.setRank(rankNode.asInt());
                } else {
                    stats.setRank(-1);
                }

                JsonNode recent = data.path("recentAcSubmissionList");
                if (recent.isArray()) {
                    for (JsonNode node : recent) {
                        stats.getRecentSubmissions().add(
                                new CodingSubmission(
                                        node.path("title").asText(""),
                                        node.path("timestamp").asText("")
                                )
                        );
                    }
                }
            }

        } catch (Exception e) {
            System.err.println("Error fetching LeetCode stats for " + username + ": " + e.getMessage());
            stats.setRank(-1);
        }

        return stats;
    }

    private CodeforcesStats fetchCodeforcesStats(String handle) {
        CodeforcesStats stats = new CodeforcesStats();

        if (handle == null || handle.trim().isEmpty()) {
            return stats;
        }

        try {
            String userInfoUrl = "https://codeforces.com/api/user.info?handles=" + handle;
            String userInfoResponse = restTemplate.getForObject(userInfoUrl, String.class);

            if (userInfoResponse != null) {
                JsonNode root = objectMapper.readTree(userInfoResponse);

                if ("OK".equals(root.path("status").asText())) {
                    JsonNode result = root.path("result").get(0);

                    if (result != null) {
                        stats.setRating(result.path("rating").asInt(0));
                    }
                }
            }

            String statusUrl = "https://codeforces.com/api/user.status?handle=" + handle;
            String statusResponse = restTemplate.getForObject(statusUrl, String.class);

            if (statusResponse != null) {
                JsonNode root = objectMapper.readTree(statusResponse);

                if ("OK".equals(root.path("status").asText())) {
                    JsonNode result = root.path("result");

                    if (result.isArray()) {
                        stats.setSubmissions(result.size());

                        Set<String> solvedProblems = new HashSet<>();
                        int count = 0;

                        for (JsonNode node : result) {
                            if ("OK".equals(node.path("verdict").asText())) {
                                String problemName = node.path("problem").path("name").asText("");
                                solvedProblems.add(problemName);
                            }

                            if (count < 10) {
                                String problemName = node.path("problem").path("name").asText("");
                                long timeSeconds = node.path("creationTimeSeconds").asLong();

                                stats.getRecentActivity().add(
                                        new CodingSubmission(
                                                problemName,
                                                String.valueOf(timeSeconds)
                                        )
                                );
                                count++;
                            }
                        }

                        stats.setTotalSolved(solvedProblems.size());
                    }
                }
            }

        } catch (Exception e) {
            System.err.println("Error fetching Codeforces stats for " + handle + ": " + e.getMessage());
        }

        return stats;
    }
}