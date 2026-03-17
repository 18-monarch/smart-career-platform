package com.smartcareer.platform.controller;

import com.smartcareer.platform.entity.ContestRecord;
import com.smartcareer.platform.service.ContestTrackerService;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/contests")
@CrossOrigin(origins = "http://localhost:5173")
public class ContestTrackerController {

    private final ContestTrackerService service;

    public ContestTrackerController(ContestTrackerService service) {
        this.service = service;
    }

    @PostMapping
    public ContestRecord add(@RequestBody ContestRecord record) {
        return service.addRecord(record);
    }

    @GetMapping("/{userId}")
    public Map<String, Object> getStats(@PathVariable Long userId) {
        return service.getStats(userId);
    }
}
