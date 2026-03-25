package com.smartcareer.platform.service;

import com.smartcareer.platform.dto.DashboardDTO;
import com.smartcareer.platform.entity.CodingActivity;
import com.smartcareer.platform.entity.ProductivityLog;
import com.smartcareer.platform.repository.CodingActivityRepository;
import com.smartcareer.platform.repository.ProductivityLogRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
public class DashboardService {

    private final CodingActivityRepository codingRepo;
    private final ProductivityLogRepository productivityRepo;

    public DashboardService(
            CodingActivityRepository codingRepo,
            ProductivityLogRepository productivityRepo) {
        this.codingRepo = codingRepo;
        this.productivityRepo = productivityRepo;
    }

    public DashboardDTO getDashboardStats(Long userId) {

        List<CodingActivity> activities = codingRepo.findByUserId(userId);
        List<ProductivityLog> prodLogs = productivityRepo.findByUserIdOrderByDateAsc(userId);

        // Total problems solved
        int problemsSolved = activities.stream()
                .mapToInt(CodingActivity::getProblemsSolved)
                .sum();

        // Learning hours from latest productivity log
        double learningHours = prodLogs.isEmpty() ? 0 :
                prodLogs.get(prodLogs.size() - 1).getLearningHours();

        // Avg productivity score
        int productivityScore = (int) prodLogs.stream()
                .mapToInt(ProductivityLog::getProductivityScore)
                .average().orElse(0);

        // Career progress = % of milestones done (simple heuristic: ratio of problems solved)
        int careerProgress = Math.min(100, (problemsSolved / 2));

        // Productivity chart data — last 7 days
        List<Map<String, Object>> productivityData = new ArrayList<>();
        for (int i = 6; i >= 0; i--) {
            LocalDate date = LocalDate.now().minusDays(i);
            final LocalDate fd = date;
            String dayName = date.getDayOfWeek().name().substring(0, 3);

            double hours = prodLogs.stream()
                    .filter(p -> p.getDate().equals(fd))
                    .mapToDouble(ProductivityLog::getLearningHours)
                    .sum();

            double distraction = prodLogs.stream()
                    .filter(p -> p.getDate().equals(fd))
                    .mapToDouble(ProductivityLog::getDistractionHours)
                    .sum();

            Map<String, Object> dayData = new LinkedHashMap<>();
            dayData.put("day", dayName);
            dayData.put("hours", hours);
            dayData.put("distraction", distraction);
            productivityData.add(dayData);
        }

        // Coding chart data — last 7 days
        List<Map<String, Object>> codingData = new ArrayList<>();
        for (int i = 6; i >= 0; i--) {
            LocalDate date = LocalDate.now().minusDays(i);
            final LocalDate fd = date;
            String dayName = date.getDayOfWeek().name().substring(0, 3);

            int problems = activities.stream()
                    .filter(a -> a.getDate().equals(fd))
                    .mapToInt(CodingActivity::getProblemsSolved)
                    .sum();

            Map<String, Object> dayData = new LinkedHashMap<>();
            dayData.put("day", dayName);
            dayData.put("problems", problems);
            codingData.add(dayData);
        }

        DashboardDTO dto = new DashboardDTO();
        dto.setProductivityScore(productivityScore);
        dto.setLearningHours(learningHours);
        dto.setProblemsSolved(problemsSolved);
        dto.setCareerProgress(careerProgress);
        dto.setProductivityData(productivityData);
        dto.setCodingData(codingData);

        // Add today's metrics
        List<Map<String, Object>> metrics = new ArrayList<>();
        metrics.add(createMetric("Distraction Time", "1.5h", "Social media", "amber"));
        metrics.add(createMetric("Fitness Score", "82%", "Daily activity", "emerald"));
        metrics.add(createMetric("Internship Ready", "76%", "Skill match", "indigo"));
        dto.setMetrics(metrics);

        // Add notifications
        List<Map<String, Object>> notifications = new ArrayList<>();
        notifications.add(createNotification("7-day coding streak achieved! 🏆", "2h ago"));
        notifications.add(createNotification("Mock interview scheduled for tomorrow", "5h ago"));
        notifications.add(createNotification("New internship matches available", "1d ago"));
        dto.setNotifications(notifications);

        return dto;
    }

    private Map<String, Object> createMetric(String label, String value, String sub, String color) {
        Map<String, Object> m = new LinkedHashMap<>();
        m.put("label", label);
        m.put("value", value);
        m.put("sub", sub);
        m.put("color", color);
        return m;
    }

    private Map<String, Object> createNotification(String title, String time) {
        Map<String, Object> m = new LinkedHashMap<>();
        m.put("title", title);
        m.put("time", time);
        return m;
    }
}