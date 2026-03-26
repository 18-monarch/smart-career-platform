package com.smartcareer.platform.service;

import com.smartcareer.platform.entity.*;
import com.smartcareer.platform.repository.*;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class DashboardService {

    private final ProductivityLogRepository productivityRepo;
    private final CodingActivityRepository codingRepo;
    private final NotificationRepository notificationRepo;
    private final SkillAssessmentRepository skillRepo;
    private final UserRepository userRepo;

    public DashboardService(ProductivityLogRepository productivityRepo,
                            CodingActivityRepository codingRepo,
                            NotificationRepository notificationRepo,
                            SkillAssessmentRepository skillRepo,
                            UserRepository userRepo) {
        this.productivityRepo = productivityRepo;
        this.codingRepo = codingRepo;
        this.notificationRepo = notificationRepo;
        this.skillRepo = skillRepo;
        this.userRepo = userRepo;
    }

    public Map<String, Object> getDashboardData(String email) {
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Long userId = user.getId();

        List<ProductivityLog> productivityLogs = productivityRepo.findByUserIdOrderByDateAsc(userId);
        List<CodingActivity> codingActivities = codingRepo.findByUserId(userId);
        List<Notification> notifications = notificationRepo.findByUserIdOrderByCreatedAtDesc(userId);
        List<SkillAssessment> skills = skillRepo.findByUserId(userId);

        // Calculate scores
        double avgProductivity = productivityLogs.stream()
                .mapToInt(ProductivityLog::getProductivityScore)
                .average().orElse(0.0);

        double totalHours = productivityLogs.stream()
                .mapToDouble(ProductivityLog::getLearningHours)
                .sum();

        int totalProblems = codingActivities.stream()
                .mapToInt(CodingActivity::getProblemsSolved)
                .sum();

        double careerProgress = skills.stream()
                .mapToInt(SkillAssessment::getCurrentLevel)
                .average().orElse(0.0) * 10;

        Map<String, Object> data = new HashMap<>();
        data.put("id", user.getId());
        data.put("name", user.getName());
        data.put("email", user.getEmail());
        data.put("productivityScore", Math.round(avgProductivity));
        data.put("learningHours", totalHours);
        data.put("problemsSolved", totalProblems);
        data.put("careerProgress", Math.round(careerProgress));

        // Productivity Chart Data
        data.put("productivityData", productivityLogs.stream().map(log -> {
            Map<String, Object> map = new HashMap<>();
            map.put("day", log.getDate().getDayOfWeek().name().substring(0, 3));
            map.put("hours", log.getLearningHours());
            map.put("distraction", log.getDistractionHours());
            return map;
        }).collect(Collectors.toList()));

        // Coding Chart Data
        data.put("codingData", codingActivities.stream().map(activity -> {
            Map<String, Object> map = new HashMap<>();
            map.put("day", activity.getDate().getDayOfWeek().name().substring(0, 3));
            map.put("problems", activity.getProblemsSolved());
            return map;
        }).collect(Collectors.toList()));

        // Metrics
        List<Map<String, Object>> metrics = new ArrayList<>();
        metrics.add(Map.of("label", "Distraction Time", "value", "1.5h", "color", "amber"));
        metrics.add(Map.of("label", "Fitness Score", "value", "82%", "color", "emerald"));
        metrics.add(Map.of("label", "Internship Ready", "value", "76%", "color", "indigo"));
        data.put("metrics", metrics);

        // Notifications
        data.put("notifications", notifications.stream().limit(5).map(n -> {
            Map<String, Object> map = new HashMap<>();
            map.put("title", "Update");
            map.put("message", n.getMessage());
            map.put("time", "Recent");
            return map;
        }).collect(Collectors.toList()));

        return data;
    }
}