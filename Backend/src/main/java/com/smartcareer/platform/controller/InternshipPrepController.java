package com.smartcareer.platform.controller;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/internship-prep")
public class InternshipPrepController {

    @GetMapping
    public List<Map<String, Object>> getPrepSections() {
        List<Map<String, Object>> sections = new ArrayList<>();
        sections.add(createSection("Coding Preparation", "Code", 68, Arrays.asList("Master Data Structures", "Algorithm Practice", "Dynamic Programming")));
        sections.add(createSection("Resume Building", "FileText", 85, Arrays.asList("Create ATS-friendly resume", "Add 3-5 strong projects")));
        sections.add(createSection("Interview Questions", "MessageSquare", 45, Arrays.asList("Behavioral questions prep", "Technical interview practice")));
        return sections;
    }

    private Map<String, Object> createSection(String title, String icon, int progress, List<String> tasks) {
        Map<String, Object> s = new LinkedHashMap<>();
        s.put("title", title);
        s.put("icon", icon);
        s.put("progress", progress);
        s.put("tasks", tasks);
        return s;
    }
}
