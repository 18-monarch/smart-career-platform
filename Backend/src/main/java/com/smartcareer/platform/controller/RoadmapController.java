package com.smartcareer.platform.controller;

import com.smartcareer.platform.entity.RoadmapMilestone;
import com.smartcareer.platform.repository.UserRepository;
import com.smartcareer.platform.service.RoadmapService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/roadmap")
public class RoadmapController {

    private final RoadmapService service;
    private final UserRepository userRepo;

    public RoadmapController(RoadmapService service, UserRepository userRepo) {
        this.service = service;
        this.userRepo = userRepo;
    }

    private Long getUserId(Authentication auth) {
        return userRepo.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"))
                .getId();
    }

    @PostMapping
    public RoadmapMilestone save(@RequestBody RoadmapMilestone milestone, Authentication auth) {
        milestone.setUserId(getUserId(auth));
        return service.save(milestone);
    }

    @GetMapping
    public List<RoadmapMilestone> getRoadmap(Authentication auth) {
        return service.getRoadmap(getUserId(auth));
    }

    @PutMapping("/{id}/complete")
    public RoadmapMilestone toggle(@PathVariable Long id) {
        return service.toggleComplete(id);
    }
}
