package com.smartcareer.platform.controller;


import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import com.smartcareer.platform.service.GithubService;
import com.smartcareer.platform.dto.GithubStatsDTO;

@RestController
@RequestMapping("/api/github")
public class GithubController {

    @Autowired
    private GithubService githubService;

    @GetMapping("/{username}")
    public GithubStatsDTO getStats(@PathVariable String username){
        return githubService.getGithubStats(username);
    }
}