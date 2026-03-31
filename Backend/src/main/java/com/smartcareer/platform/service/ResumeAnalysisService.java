package com.smartcareer.platform.service;

import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class ResumeAnalysisService {

    public Map<String, Object> analyzeResume(MultipartFile file) {
        String text = extractText(file);
        String lower = text.toLowerCase();

        List<Map<String, Object>> sections = new ArrayList<>();
        List<Map<String, String>> suggestions = new ArrayList<>();

        int score = 0;

        boolean hasEmail = containsEmail(text);
        boolean hasPhone = containsPhone(text);
        boolean hasLinkedIn = lower.contains("linkedin");
        boolean hasGithub = lower.contains("github");

        int contactScore = 0;
        if (hasEmail) contactScore += 35;
        if (hasPhone) contactScore += 35;
        if (hasLinkedIn || hasGithub) contactScore += 30;

        sections.add(createSection("Contact Information",
                contactScore >= 90 ? "complete" : contactScore >= 60 ? "good" : "warning",
                contactScore));

        score += contactScore >= 80 ? 12 : contactScore >= 60 ? 8 : 4;

        boolean hasSummary = containsAny(lower, "summary", "professional summary", "objective", "profile");
        int summaryScore = hasSummary ? 85 : 30;
        sections.add(createSection("Professional Summary", hasSummary ? "good" : "warning", summaryScore));
        score += hasSummary ? 10 : 4;

        boolean hasExperience = containsAny(lower, "experience", "work experience", "internship", "employment");
        int experienceScore = hasExperience ? 85 : 25;
        sections.add(createSection("Work Experience", hasExperience ? "good" : "missing", experienceScore));
        score += hasExperience ? 18 : 5;

        boolean hasEducation = containsAny(lower, "education", "b.tech", "bachelor", "master", "university", "college");
        int educationScore = hasEducation ? 100 : 30;
        sections.add(createSection("Education", hasEducation ? "complete" : "warning", educationScore));
        score += hasEducation ? 14 : 5;

        boolean hasSkills = containsAny(lower, "skills", "technical skills", "technologies", "tools");
        int skillsScore = hasSkills ? 75 : 25;
        sections.add(createSection("Skills", hasSkills ? "good" : "warning", skillsScore));
        score += hasSkills ? 12 : 4;

        boolean hasProjects = containsAny(lower, "projects", "project");
        int projectsScore = hasProjects ? 80 : 20;
        sections.add(createSection("Projects", hasProjects ? "good" : "missing", projectsScore));
        score += hasProjects ? 16 : 4;

        boolean hasAchievements = containsAny(lower, "achievement", "achievements", "certification", "awards", "hackathon");
        int achievementsScore = hasAchievements ? 70 : 0;
        sections.add(createSection("Achievements", hasAchievements ? "good" : "missing", achievementsScore));
        score += hasAchievements ? 8 : 0;

        int quantifiedBullets = countQuantifiedImpact(text);
        if (quantifiedBullets >= 4) {
            score += 10;
        } else if (quantifiedBullets >= 2) {
            score += 6;
        } else if (quantifiedBullets >= 1) {
            score += 3;
        }

        int keywordFound = countKeywordHits(lower, commonAtsKeywords());
        int totalKeywords = commonAtsKeywords().size();
        int coverage = totalKeywords == 0 ? 0 : Math.min(100, (keywordFound * 100) / totalKeywords);
        int missing = Math.max(0, totalKeywords - keywordFound);
        int suggested = Math.min(10, missing);

        if (!hasSummary) {
            suggestions.add(createSuggestion(
                    "important",
                    "Add Professional Summary",
                    "Your resume lacks a clear professional summary or profile section."
            ));
        }

        if (quantifiedBullets == 0) {
            suggestions.add(createSuggestion(
                    "critical",
                    "Add Quantifiable Achievements",
                    "Use measurable outcomes like percentages, counts, performance gains, or time saved."
            ));
        }

        if (!hasProjects) {
            suggestions.add(createSuggestion(
                    "important",
                    "Add Projects Section",
                    "A project section is important, especially for student and early-career resumes."
            ));
        }

        if (!hasAchievements) {
            suggestions.add(createSuggestion(
                    "minor",
                    "Add Achievements or Certifications",
                    "Include hackathons, certifications, awards, leadership, or competitive accomplishments."
            ));
        }

        if (coverage < 60) {
            suggestions.add(createSuggestion(
                    "important",
                    "Improve ATS Keyword Match",
                    "Your resume can be improved by including more common technical and role-relevant keywords."
            ));
        }

        if (!hasSkills) {
            suggestions.add(createSuggestion(
                    "critical",
                    "Add Skills Section",
                    "Recruiters and ATS systems expect a dedicated skills or technologies section."
            ));
        }

        score = Math.min(score, 100);

        String status;
        String message;

        if (score >= 85) {
            status = "Strong Resume";
            message = "Your resume is strong and fairly complete. Only minor optimization is needed.";
        } else if (score >= 70) {
            status = "Good Resume";
            message = "Your resume is solid, but some sections can be improved for better impact.";
        } else if (score >= 50) {
            status = "Average Resume";
            message = "Your resume has a base structure, but multiple areas need strengthening.";
        } else {
            status = "Weak Resume";
            message = "Your resume needs significant improvement in structure, content, and ATS readiness.";
        }

        Map<String, Object> keywords = new LinkedHashMap<>();
        keywords.put("coverage", coverage);
        keywords.put("found", keywordFound);
        keywords.put("missing", missing);
        keywords.put("suggested", suggested);
        keywords.put("relevance", coverage >= 75 ? "High" : coverage >= 50 ? "Medium" : "Low");

        Map<String, Object> meta = new LinkedHashMap<>();
        meta.put("fileName", file.getOriginalFilename());
        meta.put("fileSize", file.getSize());
        meta.put("analyzedAt", new Date().toString());
        meta.put("quantifiedBullets", quantifiedBullets);

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("score", score);
        result.put("status", status);
        result.put("message", message);
        result.put("sections", sections);
        result.put("suggestions", suggestions);
        result.put("keywords", keywords);
        result.put("meta", meta);

        return result;
    }

    private String extractText(MultipartFile file) {
        String name = file.getOriginalFilename() == null ? "" : file.getOriginalFilename().toLowerCase();

        try {
            if (name.endsWith(".pdf")) {
                try (PDDocument document = Loader.loadPDF(file.getBytes())) {
                    PDFTextStripper stripper = new PDFTextStripper();
                    return stripper.getText(document);
                }
            }

            if (name.endsWith(".docx")) {
                try (InputStream is = file.getInputStream(); XWPFDocument doc = new XWPFDocument(is)) {
                    StringBuilder sb = new StringBuilder();
                    doc.getParagraphs().forEach(p -> sb.append(p.getText()).append("\n"));
                    return sb.toString();
                }
            }

        } catch (Exception e) {
            throw new RuntimeException("Failed to extract text from resume: " + e.getMessage());
        }

        throw new RuntimeException("Unsupported file type");
    }

    private boolean containsEmail(String text) {
        Pattern pattern = Pattern.compile("[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+");
        return pattern.matcher(text).find();
    }

    private boolean containsPhone(String text) {
        Pattern pattern = Pattern.compile("(\\+\\d{1,3}[\\s-]?)?(\\d{10}|\\d{3}[\\s-]\\d{3}[\\s-]\\d{4})");
        return pattern.matcher(text).find();
    }

    private boolean containsAny(String text, String... terms) {
        for (String term : terms) {
            if (text.contains(term.toLowerCase())) {
                return true;
            }
        }
        return false;
    }

    private int countQuantifiedImpact(String text) {
        Pattern pattern = Pattern.compile("\\b(\\d+%|\\d+\\+|\\d+ users|\\d+ projects|\\d+ clients|\\d+ days|\\d+ months|\\d+x)\\b", Pattern.CASE_INSENSITIVE);
        Matcher matcher = pattern.matcher(text);
        int count = 0;
        while (matcher.find()) count++;
        return count;
    }

    private int countKeywordHits(String text, List<String> keywords) {
        int found = 0;
        for (String keyword : keywords) {
            if (text.contains(keyword)) {
                found++;
            }
        }
        return found;
    }

    private List<String> commonAtsKeywords() {
        return Arrays.asList(
                "java", "python", "javascript", "react", "spring boot", "sql",
                "mysql", "api", "rest", "html", "css", "git", "github",
                "problem solving", "teamwork", "communication", "leadership",
                "deployment", "backend", "frontend"
        );
    }

    private Map<String, Object> createSection(String name, String status, int score) {
        Map<String, Object> section = new LinkedHashMap<>();
        section.put("name", name);
        section.put("status", status);
        section.put("score", score);
        return section;
    }

    private Map<String, String> createSuggestion(String type, String title, String description) {
        Map<String, String> suggestion = new LinkedHashMap<>();
        suggestion.put("type", type);
        suggestion.put("title", title);
        suggestion.put("description", description);
        return suggestion;
    }
}