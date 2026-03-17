package com.smartcareer.platform.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;

@Service
public class LeetcodeService {

    private final RestTemplate restTemplate = new RestTemplate();

    public String getStats(String username){

        String url = "https://leetcode.com/graphql";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String body = """
        {
          "query":"query getUser($username:String!){ matchedUser(username:$username){ submitStats { acSubmissionNum { difficulty count } } } }",
          "variables":{"username":"%s"}
        }
        """.formatted(username);

        HttpEntity<String> request = new HttpEntity<>(body,headers);

        ResponseEntity<String> response =
                restTemplate.postForEntity(url,request,String.class);

        return response.getBody();
    }
}