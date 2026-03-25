package com.smartcareer.platform.controller;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/mock-test")
public class MockTestController {

    @GetMapping
    public List<Map<String, Object>> getQuestions() {
        List<Map<String, Object>> questions = new ArrayList<>();
        questions.add(createQuestion(1, "mcq", "What is the time complexity of binary search?", Arrays.asList("O(n)", "O(log n)", "O(n²)", "O(1)"), 1));
        questions.add(createQuestion(2, "mcq", "Which data structure uses LIFO?", Arrays.asList("Queue", "Stack", "Linked List", "Tree"), 1));
        questions.add(createQuestion(3, "coding", "Two Sum Problem", null, 0));
        return questions;
    }

    private Map<String, Object> createQuestion(int id, String type, String text, List<String> options, int correct) {
        Map<String, Object> q = new LinkedHashMap<>();
        q.put("id", id);
        q.put("type", type);
        q.put("text", text);
        q.put("options", options);
        q.put("correctOption", correct);
        return q;
    }
}
