package com.smartcareer.platform.service;

import com.smartcareer.platform.entity.RoadmapMilestone;
import com.smartcareer.platform.repository.RoadmapMilestoneRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class RoadmapService {

    private final RoadmapMilestoneRepository repo;

    public RoadmapService(RoadmapMilestoneRepository repo) {
        this.repo = repo;
    }

    public RoadmapMilestone save(RoadmapMilestone milestone) {
        return repo.save(milestone);
    }

    public List<RoadmapMilestone> getRoadmap(Long userId) {
        return repo.findByUserIdOrderBySortOrderAsc(userId);
    }

    public RoadmapMilestone toggleComplete(Long id) {
        RoadmapMilestone m = repo.findById(id).orElseThrow();
        m.setCompleted(!m.isCompleted());
        return repo.save(m);
    }
}
