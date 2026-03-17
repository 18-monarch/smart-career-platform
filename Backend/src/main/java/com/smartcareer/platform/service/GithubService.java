package com.smartcareer.platform.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;

import java.util.Map;

import com.smartcareer.platform.dto.GithubStatsDTO;

@Service
public class GithubService {

    private final RestTemplate restTemplate = new RestTemplate();

    public GithubStatsDTO getGithubStats(String username) {

        String url = "https://api.github.com/users/" + username + "/events";

        ResponseEntity<Object[]> response =
                restTemplate.getForEntity(url, Object[].class);

        Object[] events = response.getBody();

        int commits = 0;
        int prs = 0;

        if(events != null){
            for(Object event : events){

                @SuppressWarnings("unchecked")
                Map<String,Object> e = (Map<String,Object>) event;
                String type = (String) e.get("type");

                if("PushEvent".equals(type)) commits++;
                if("PullRequestEvent".equals(type)) prs++;
            }
        }

        return new GithubStatsDTO(commits, prs);
    }
}