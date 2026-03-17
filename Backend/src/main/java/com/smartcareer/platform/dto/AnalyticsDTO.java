package com.smartcareer.platform.dto;

public class AnalyticsDTO {

    private int totalProblems;
    private int weeklyProblems;
    private double avgProblemsPerDay;
    private int codingStreak;
    private int productivityScore;

    public AnalyticsDTO() {}

    public AnalyticsDTO(int totalProblems, int weeklyProblems, double avgProblemsPerDay, int codingStreak, int productivityScore) {
        this.totalProblems = totalProblems;
        this.weeklyProblems = weeklyProblems;
        this.avgProblemsPerDay = avgProblemsPerDay;
        this.codingStreak = codingStreak;
        this.productivityScore = productivityScore;
    }

    public int getTotalProblems() {
        return totalProblems;
    }

    public int getWeeklyProblems() {
        return weeklyProblems;
    }

    public double getAvgProblemsPerDay() {
        return avgProblemsPerDay;
    }

    public int getCodingStreak() {
        return codingStreak;
    }

    public int getProductivityScore() {
        return productivityScore;
    }
}