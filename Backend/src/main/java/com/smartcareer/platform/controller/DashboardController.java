package com.smartcareer.platform.controller;

import com.smartcareer.platform.service.DashboardService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    // ✅ CORRECT ENDPOINT USING JWT
    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, Object>> getDashboard(Authentication authentication) {
        String email = authentication.getName(); // from JWT
        Map<String, Object> data = dashboardService.getDashboardData(email);
        return ResponseEntity.ok(data);
    }
}