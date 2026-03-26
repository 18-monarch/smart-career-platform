package com.smartcareer.platform.controller;

import com.smartcareer.platform.dto.AnalyticsDTO;
import com.smartcareer.platform.repository.UserRepository;
import com.smartcareer.platform.service.AnalyticsService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {

    private final AnalyticsService service;
    private final UserRepository userRepo;

    public AnalyticsController(AnalyticsService service, UserRepository userRepo) {
        this.service = service;
        this.userRepo = userRepo;
    }

    private Long getUserId(Authentication auth) {
        return userRepo.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"))
                .getId();
    }

    @GetMapping
    public AnalyticsDTO getAnalytics(Authentication auth) {
        return service.getAnalytics(getUserId(auth));
    }
}