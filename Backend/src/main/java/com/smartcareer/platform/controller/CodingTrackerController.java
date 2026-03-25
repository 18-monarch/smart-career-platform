package com.smartcareer.platform.controller;

import com.smartcareer.platform.entity.CodingActivity;
import com.smartcareer.platform.service.CodingTrackerService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/coding")
public class CodingTrackerController {

    private final CodingTrackerService service;

    public CodingTrackerController(CodingTrackerService service) {
        this.service = service;
    }

    @PostMapping
    public CodingActivity addActivity(@RequestBody CodingActivity activity) {
        return service.saveActivity(activity);
    }

    @GetMapping("/{userId}")
    public List<CodingActivity> getActivities(@PathVariable Long userId) {
        return service.getActivities(userId);
    }
}