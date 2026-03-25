package com.smartcareer.platform.controller;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/mock-interview")
public class MockInterviewController {

    @GetMapping
    public Map<String, Object> getInterviewData() {
        Map<String, Object> data = new LinkedHashMap<>();
        
        List<String> questions = Arrays.asList(
            "Tell me about yourself and your background",
            "Why do you want to work at our company?",
            "Describe a challenging project you worked on",
            "How do you handle tight deadlines?",
            "What are your strengths and weaknesses?"
        );
        data.put("questions", questions);

        Map<String, Object> feedback = new LinkedHashMap<>();
        feedback.put("confidence", 82);
        feedback.put("communication", 78);
        feedback.put("clarity", 75);
        feedback.put("bodyLanguage", 85);
        data.put("feedback", feedback);

        List<String> suggestions = Arrays.asList(
            "Add more specific examples",
            "Reduce filler words (\"um\", \"like\")",
            "Improve eye contact"
        );
        data.put("suggestions", suggestions);

        return data;
    }
}
