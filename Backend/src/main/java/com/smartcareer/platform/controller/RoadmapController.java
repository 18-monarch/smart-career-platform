package com.smartcareer.platform.controller;

import com.smartcareer.platform.entity.RoadmapMilestone;
import com.smartcareer.platform.service.RoadmapService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/roadmap")
@CrossOrigin(origins = "http://localhost:5173")
public class RoadmapController {

    private final RoadmapService service;

    public RoadmapController(RoadmapService service) {
        this.service = service;
    }

    @PostMapping
    public RoadmapMilestone save(@RequestBody RoadmapMilestone milestone) {
        return service.save(milestone);
    }

    @GetMapping("/{userId}")
    public List<RoadmapMilestone> getRoadmap(@PathVariable Long userId) {
        return service.getRoadmap(userId);
    }

    @PutMapping("/{id}/complete")
    public RoadmapMilestone toggle(@PathVariable Long id) {
        return service.toggleComplete(id);
    }
}
