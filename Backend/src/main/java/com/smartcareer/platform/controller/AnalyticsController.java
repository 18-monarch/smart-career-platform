package com.smartcareer.platform.controller;

import com.smartcareer.platform.dto.AnalyticsDTO;
import com.smartcareer.platform.service.AnalyticsService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/analytics")
@CrossOrigin(origins = "http://localhost:5173")
public class AnalyticsController {

    private final AnalyticsService service;

    public AnalyticsController(AnalyticsService service) {
        this.service = service;
    }

    @GetMapping("/{userId}")
    public AnalyticsDTO getAnalytics(@PathVariable Long userId) {
        return service.getAnalytics(userId);
    }
}