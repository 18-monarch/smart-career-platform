package com.smartcareer.platform.dto;

import java.util.List;
import java.util.Map;

public class DashboardDTO {

    private int productivityScore;
    private double learningHours;
    private int problemsSolved;
    private int careerProgress;
    private List<Map<String, Object>> productivityData;
    private List<Map<String, Object>> codingData;

    public DashboardDTO() {}

    public int getProductivityScore() { return productivityScore; }
    public void setProductivityScore(int productivityScore) { this.productivityScore = productivityScore; }

    public double getLearningHours() { return learningHours; }
    public void setLearningHours(double learningHours) { this.learningHours = learningHours; }

    public int getProblemsSolved() { return problemsSolved; }
    public void setProblemsSolved(int problemsSolved) { this.problemsSolved = problemsSolved; }

    public int getCareerProgress() { return careerProgress; }
    public void setCareerProgress(int careerProgress) { this.careerProgress = careerProgress; }

    public List<Map<String, Object>> getProductivityData() { return productivityData; }
    public void setProductivityData(List<Map<String, Object>> productivityData) { this.productivityData = productivityData; }

    public List<Map<String, Object>> getCodingData() { return codingData; }
    public void setCodingData(List<Map<String, Object>> codingData) { this.codingData = codingData; }
}