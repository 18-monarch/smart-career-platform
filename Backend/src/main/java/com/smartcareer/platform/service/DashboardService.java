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
        return dto;
    }
}