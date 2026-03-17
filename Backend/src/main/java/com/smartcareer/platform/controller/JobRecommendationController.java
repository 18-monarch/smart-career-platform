package com.smartcareer.platform.controller;

import com.smartcareer.platform.service.SkillGapService;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin(origins = "http://localhost:5173")
public class JobRecommendationController {

    private final SkillGapService skillGapService;

    public JobRecommendationController(SkillGapService skillGapService) {
        this.skillGapService = skillGapService;
    }

    @GetMapping("/recommend")
    public List<Map<String, Object>> recommend(@RequestParam Long userId) {
        List<Map<String, Object>> skills = skillGapService.getSkillGap(userId);

        List<Map<String, Object>> jobs = new ArrayList<>();

        // Rule-based job matching
        boolean hasJava = skills.stream().anyMatch(s -> "Java".equalsIgnoreCase((String) s.get("skillName")) && (int) s.get("currentLevel") >= 6);
        boolean hasPython = skills.stream().anyMatch(s -> "Python".equalsIgnoreCase((String) s.get("skillName")) && (int) s.get("currentLevel") >= 6);
        boolean hasML = skills.stream().anyMatch(s -> "Machine Learning".equalsIgnoreCase((String) s.get("skillName")) && (int) s.get("currentLevel") >= 5);
        boolean hasWeb = skills.stream().anyMatch(s -> ((String) s.get("skillName")).toLowerCase().contains("react") && (int) s.get("currentLevel") >= 6);

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
