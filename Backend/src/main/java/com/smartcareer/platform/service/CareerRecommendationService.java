package com.smartcareer.platform.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.ArrayList;

import com.smartcareer.platform.dto.CareerRecommendationDTO;
import com.smartcareer.platform.dto.GithubStatsDTO;

@Service
public class CareerRecommendationService {

    @Autowired
    private GithubService githubService;

    public CareerRecommendationDTO generate(String githubUsername){

        GithubStatsDTO github = githubService.getGithubStats(githubUsername);

        int commits = github.getTotalCommits();

        int careerScore = Math.min(100, commits / 5 + 40);

        String role;

        if(commits > 300)
            role = "Backend Developer";
        else if(commits > 150)
            role = "Full Stack Developer";
        else
            role = "Junior Software Developer";

        List<String> strengths = new ArrayList<>();
        List<String> weaknesses = new ArrayList<>();
        List<String> suggestions = new ArrayList<>();

        if(commits > 200){
            strengths.add("Strong coding consistency");
        }else{
            weaknesses.add("Low GitHub contribution");
            suggestions.add("Increase daily coding activity");
        }

        suggestions.add("Practice Data Structures");
        suggestions.add("Build Backend Projects");
        suggestions.add("Learn System Design");

        return new CareerRecommendationDTO(
                role,
                careerScore,
                strengths,
                weaknesses,
                suggestions
        );
    }
}