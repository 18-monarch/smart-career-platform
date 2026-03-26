package com.smartcareer.platform.service;

import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class JobService {

    private final SkillGapService skillGapService;

    public JobService(SkillGapService skillGapService) {
        this.skillGapService = skillGapService;
    }

    public List<Map<String, Object>> getRecommendations(Long userId) {
        List<Map<String, Object>> skills = skillGapService.getSkillGap(userId);
        List<Map<String, Object>> jobs = new ArrayList<>();

        // Rule-based job matching
        boolean hasJava = hasSkill(skills, "Java", 6);
        boolean hasPython = hasSkill(skills, "Python", 6);
        boolean hasML = hasSkill(skills, "Machine Learning", 5);
        boolean hasWeb = hasSkillMatching(skills, "react", 6);

        if (hasJava) jobs.add(createJob("Backend Engineer", "Java, Spring Boot, REST APIs", "Google", "₹12-18 LPA", "Full-time"));
        if (hasPython) jobs.add(createJob("Software Developer", "Python, Django, PostgreSQL", "Flipkart", "₹10-15 LPA", "Full-time"));
        if (hasML) jobs.add(createJob("ML Engineer", "Python, TensorFlow, Pandas", "Microsoft", "₹15-25 LPA", "Full-time"));
        if (hasWeb) jobs.add(createJob("Frontend Developer", "React, TypeScript, CSS", "Swiggy", "₹8-14 LPA", "Full-time"));
        if (hasJava && hasWeb) jobs.add(createJob("Full Stack Developer", "Java, React, MySQL", "Zepto", "₹14-22 LPA", "Full-time"));

        if (jobs.isEmpty()) {
            jobs.add(createJob("Junior Developer", "Any language, DSA, Problem Solving", "Startup", "₹5-8 LPA", "Full-time"));
        }

        return jobs;
    }

    private boolean hasSkill(List<Map<String, Object>> skills, String name, int minLevel) {
        return skills.stream().anyMatch(s -> name.equalsIgnoreCase((String) s.get("skillName")) && (int) s.get("currentLevel") >= minLevel);
    }

    private boolean hasSkillMatching(List<Map<String, Object>> skills, String pattern, int minLevel) {
        return skills.stream().anyMatch(s -> ((String) s.get("skillName")).toLowerCase().contains(pattern) && (int) s.get("currentLevel") >= minLevel);
    }

    private Map<String, Object> createJob(String title, String skills, String company, String salary, String type) {
        Map<String, Object> job = new LinkedHashMap<>();
        job.put("title", title);
        job.put("skills", skills);
        job.put("company", company);
        job.put("salary", salary);
        job.put("type", type);
        job.put("match", "85%");
        return job;
    }
}
