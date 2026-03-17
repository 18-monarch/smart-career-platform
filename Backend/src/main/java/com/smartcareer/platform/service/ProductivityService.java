package com.smartcareer.platform.service;

import com.smartcareer.platform.entity.ProductivityLog;
import com.smartcareer.platform.repository.ProductivityLogRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ProductivityService {

    private final ProductivityLogRepository repo;

    public ProductivityService(ProductivityLogRepository repo) {
        this.repo = repo;
    }

    public ProductivityLog log(ProductivityLog log) {
        return repo.save(log);
    }

    public Map<String, Object> getStats(Long userId) {
        List<ProductivityLog> logs = repo.findByUserIdOrderByDateAsc(userId);

        double avgScore = logs.stream().mapToInt(ProductivityLog::getProductivityScore).average().orElse(0);
        int totalFocus = logs.stream().mapToInt(ProductivityLog::getFocusSessions).sum();

        List<Map<String, Object>> weeklyData = new ArrayList<>();
        for (ProductivityLog l : logs) {
            Map<String, Object> day = new LinkedHashMap<>();
            day.put("date", l.getDate().toString());
            day.put("learningHours", l.getLearningHours());
            day.put("distractionHours", l.getDistractionHours());
            day.put("productivityScore", l.getProductivityScore());
            day.put("focusSessions", l.getFocusSessions());
            weeklyData.add(day);
        }

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("avgProductivityScore", Math.round(avgScore));
        result.put("totalFocusSessions", totalFocus);
        result.put("weeklyData", weeklyData);
        return result;
    }
}
