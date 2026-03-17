package com.smartcareer.platform.service;

import com.smartcareer.platform.entity.CodingActivity;
import com.smartcareer.platform.repository.CodingActivityRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CodingTrackerService {

    private final CodingActivityRepository repository;

    public CodingTrackerService(CodingActivityRepository repository) {
        this.repository = repository;
    }

    public CodingActivity saveActivity(CodingActivity activity) {
        return repository.save(activity);
    }

    public List<CodingActivity> getActivities(Long userId) {
        return repository.findByUserId(userId);
    }

}