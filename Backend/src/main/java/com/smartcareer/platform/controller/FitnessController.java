package com.smartcareer.platform.controller;

import com.smartcareer.platform.entity.FitnessLog;
import com.smartcareer.platform.service.FitnessService;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/fitness")
@CrossOrigin(origins = "http://localhost:5173")
public class FitnessController {

    private final FitnessService service;

    public FitnessController(FitnessService service) {
        this.service = service;
    }

    @PostMapping
    public FitnessLog log(@RequestBody FitnessLog log) {
        return service.log(log);
    }

    @GetMapping("/{userId}")
    public Map<String, Object> getStats(@PathVariable Long userId) {
        return service.getStats(userId);
    }
}
