package com.smartcareer.platform.service;

import com.smartcareer.platform.entity.CodingActivity;
import com.smartcareer.platform.repository.CodingActivityRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CodingActivityService {

    private final CodingActivityRepository repository;

    public CodingActivityService(CodingActivityRepository repository) {
        this.repository = repository;
    }

    public List<CodingActivity> getActivitiesByUser(Long userId) {
        return repository.findByUserId(userId);
    }

    public CodingActivity saveActivity(CodingActivity activity) {
        return repository.save(activity);
    }
}
