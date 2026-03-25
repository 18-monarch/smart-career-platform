package com.smartcareer.platform.controller;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/resume-analyzer")
public class ResumeAnalyzerController {

    @GetMapping
    public Map<String, Object> getResumeAnalysis() {
        Map<String, Object> data = new LinkedHashMap<>();
        
        data.put("score", 78);
        data.put("status", "Good Resume");
        data.put("message", "Your resume is above average. Follow the suggestions below to improve.");

        List<Map<String, Object>> sections = new ArrayList<>();
        sections.add(createSection("Contact Information", "complete", 100));
        sections.add(createSection("Professional Summary", "good", 85));
        sections.add(createSection("Work Experience", "good", 80));
        sections.add(createSection("Education", "complete", 100));
        sections.add(createSection("Skills", "warning", 65));
        sections.add(createSection("Projects", "good", 75));
        sections.add(createSection("Achievements", "missing", 0));
        data.put("sections", sections);

        List<Map<String, String>> suggestions = new ArrayList<>();
        suggestions.add(createSuggestion("critical", "Add Quantifiable Achievements", "Use numbers and metrics to demonstrate impact (e.g., 'Improved performance by 40%')"));
        suggestions.add(createSuggestion("important", "Optimize for ATS", "Include more relevant keywords from the job description"));
        suggestions.add(createSuggestion("suggestion", "Improve Skills Section", "Group skills by category (Technical, Soft Skills, Tools)"));
        suggestions.add(createSuggestion("suggestion", "Add Action Verbs", "Start bullet points with strong action verbs (Led, Developed, Implemented)"));
        data.put("suggestions", suggestions);

        Map<String, Object> keywords = new LinkedHashMap<>();
        keywords.put("coverage", 68);
        keywords.put("found", 12);
        keywords.put("missing", 6);
        keywords.put("suggested", 8);
        keywords.put("relevance", "High");
        data.put("keywords", keywords);

        return data;
    }

    private Map<String, Object> createSection(String name, String status, int score) {
        Map<String, Object> s = new LinkedHashMap<>();
        s.put("name", name);
        s.put("status", status);
        s.put("score", score);
        return s;
    }

    private Map<String, String> createSuggestion(String type, String title, String description) {
        Map<String, String> s = new LinkedHashMap<>();
        s.put("type", type);
        s.put("title", title);
        s.put("description", description);
        return s;
    }
}
