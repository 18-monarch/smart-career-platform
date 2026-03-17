package com.smartcareer.platform.service;

import com.smartcareer.platform.entity.ContestRecord;
import com.smartcareer.platform.repository.ContestRecordRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ContestTrackerService {

    private final ContestRecordRepository repo;

    public ContestTrackerService(ContestRecordRepository repo) {
        this.repo = repo;
    }

    public ContestRecord addRecord(ContestRecord record) {
        return repo.save(record);
    }

    public Map<String, Object> getStats(Long userId) {
        List<ContestRecord> records = repo.findByUserIdOrderByContestDateAsc(userId);

        int totalContests = records.size();
        int currentRating = records.isEmpty() ? 0 : records.get(records.size() - 1).getRatingAfter();
        int bestRank = records.stream().mapToInt(ContestRecord::getGlobalRank).min().orElse(0);

        double avgSolveRate = records.stream()
                .filter(r -> r.getTotalProblems() > 0)
                .mapToDouble(r -> (double) r.getProblemsSolved() / r.getTotalProblems() * 100)
                .average().orElse(0);

        List<Map<String, Object>> recentContests = new ArrayList<>();
        for (ContestRecord r : records) {
            Map<String, Object> c = new LinkedHashMap<>();
            c.put("name", r.getContestName());
            c.put("platform", r.getPlatform());
            c.put("date", r.getContestDate());
            c.put("rank", r.getGlobalRank());
            c.put("totalParticipants", r.getTotalParticipants());
            c.put("solved", r.getProblemsSolved() + "/" + r.getTotalProblems());
            c.put("rating", (r.getRatingDelta() >= 0 ? "+" : "") + r.getRatingDelta());
            recentContests.add(c);
        }

        List<Map<String, Object>> ratingHistory = new ArrayList<>();
        for (int i = 0; i < records.size(); i++) {
            Map<String, Object> point = new LinkedHashMap<>();
            point.put("contest", "C" + (i + 1));
            point.put("rating", records.get(i).getRatingAfter());
            ratingHistory.add(point);
        }

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("totalContests", totalContests);
        result.put("currentRating", currentRating);
        result.put("bestGlobalRank", bestRank);
        result.put("avgSolveRate", Math.round(avgSolveRate));
        result.put("recentContests", recentContests);
        result.put("ratingHistory", ratingHistory);
        return result;
    }
}
