package com.smartcareer.platform.dto;


import java.util.List;

public class CareerRecommendationDTO {

    private String recommendedRole;
    private int careerScore;
    private List<String> strengths;
    private List<String> weaknesses;
    private List<String> suggestions;

    public CareerRecommendationDTO(
            String recommendedRole,
            int careerScore,
            List<String> strengths,
            List<String> weaknesses,
            List<String> suggestions) {

        this.recommendedRole = recommendedRole;
        this.careerScore = careerScore;
        this.strengths = strengths;
        this.weaknesses = weaknesses;
        this.suggestions = suggestions;
    }

    public String getRecommendedRole() {
        return recommendedRole;
    }

    public int getCareerScore() {
        return careerScore;
    }

    public List<String> getStrengths() {
        return strengths;
    }

    public List<String> getWeaknesses() {
        return weaknesses;
    }

    public List<String> getSuggestions() {
        return suggestions;
    }
}