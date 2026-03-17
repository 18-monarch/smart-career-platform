package com.smartcareer.platform.service;

import com.smartcareer.platform.dto.AnalyticsDTO;
import com.smartcareer.platform.entity.CodingActivity;
import com.smartcareer.platform.repository.CodingActivityRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class AnalyticsService {

    private final CodingActivityRepository repository;

    public AnalyticsService(CodingActivityRepository repository) {
        this.repository = repository;
    }

    public AnalyticsDTO getAnalytics(Long userId) {

        List<CodingActivity> activities = repository.findByUserId(userId);

        int totalProblems = activities.stream()
                .mapToInt(CodingActivity::getProblemsSolved)
                .sum();

        LocalDate weekStart = LocalDate.now().minusDays(7);

        int weeklyProblems = activities.stream()
                .filter(a -> a.getDate().isAfter(weekStart))
                .mapToInt(CodingActivity::getProblemsSolved)
                .sum();

        double avgProblemsPerDay =
                activities.isEmpty() ? 0 : (double) totalProblems / activities.size();

        int codingStreak = calculateStreak(activities);

        int productivityScore = Math.min(100, totalProblems / 5);

        return new AnalyticsDTO(
                totalProblems,
                weeklyProblems,
                avgProblemsPerDay,
                codingStreak,
                productivityScore
        );
    }

    private int calculateStreak(List<CodingActivity> activities) {

        LocalDate today = LocalDate.now();
        int streak = 0;

        while (true) {

            LocalDate checkDate = today.minusDays(streak);

            boolean solved = activities.stream()
                    .anyMatch(a -> a.getDate().equals(checkDate));

            if (!solved) break;

            streak++;
        }

        return streak;
    }
}