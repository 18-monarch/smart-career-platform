package com.smartcareer.platform.controller;

import com.smartcareer.platform.entity.CodingActivity;
import com.smartcareer.platform.repository.UserRepository;
import com.smartcareer.platform.service.CodingTrackerService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/coding")
public class CodingTrackerController {

    private final CodingTrackerService service;
    private final UserRepository userRepo;

    public CodingTrackerController(CodingTrackerService service, UserRepository userRepo) {
        this.service = service;
        this.userRepo = userRepo;
    }

    private Long getUserId(Authentication auth) {
        return userRepo.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"))
                .getId();
    }

    @PostMapping
    public CodingActivity addActivity(@RequestBody CodingActivity activity, Authentication auth) {
        activity.setUserId(getUserId(auth));
        return service.saveActivity(activity);
    }

    @GetMapping
    public List<CodingActivity> getActivities(Authentication auth) {
        return service.getActivities(getUserId(auth));
    }
}