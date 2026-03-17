package com.smartcareer.platform.service;

import com.smartcareer.platform.entity.FitnessLog;
import com.smartcareer.platform.repository.FitnessLogRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class FitnessService {

    private final FitnessLogRepository repo;

    public FitnessService(FitnessLogRepository repo) {
        this.repo = repo;
    }

    public FitnessLog log(FitnessLog log) {
        return repo.save(log);
    }

    public Map<String, Object> getStats(Long userId) {
        List<FitnessLog> logs = repo.findByUserIdOrderByDateAsc(userId);

        double avgSleep = logs.stream().mapToDouble(FitnessLog::getSleepHours).average().orElse(0);
        int totalSteps = logs.stream().mapToInt(FitnessLog::getSteps).sum();
        int totalWorkout = logs.stream().mapToInt(FitnessLog::getWorkoutMinutes).sum();

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("avgSleepHours", Math.round(avgSleep * 10.0) / 10.0);
        result.put("totalSteps", totalSteps);
        result.put("totalWorkoutMinutes", totalWorkout);
        result.put("logs", logs);
        return result;
    }
}
