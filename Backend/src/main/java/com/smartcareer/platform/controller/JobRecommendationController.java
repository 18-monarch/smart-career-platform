package com.smartcareer.platform.controller;

import com.smartcareer.platform.repository.UserRepository;
import com.smartcareer.platform.service.JobService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/jobs")
public class JobRecommendationController {

    private final JobService jobService;
    private final UserRepository userRepo;

    public JobRecommendationController(JobService jobService, UserRepository userRepo) {
        this.jobService = jobService;
        this.userRepo = userRepo;
    }

    private Long getUserId(Authentication auth) {
        return userRepo.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"))
                .getId();
    }

    @GetMapping("/recommend")
    public List<Map<String, Object>> recommend(Authentication auth) {
        return jobService.getRecommendations(getUserId(auth));
    }
}
