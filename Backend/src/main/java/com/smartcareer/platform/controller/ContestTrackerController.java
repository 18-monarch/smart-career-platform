package com.smartcareer.platform.controller;

import com.smartcareer.platform.entity.ContestRecord;
import com.smartcareer.platform.repository.UserRepository;
import com.smartcareer.platform.service.ContestTrackerService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/contests")
public class ContestTrackerController {

    private final ContestTrackerService service;
    private final UserRepository userRepo;

    public ContestTrackerController(ContestTrackerService service, UserRepository userRepo) {
        this.service = service;
        this.userRepo = userRepo;
    }

    private Long getUserId(Authentication auth) {
        return userRepo.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"))
                .getId();
    }

    @PostMapping
    public ContestRecord add(@RequestBody ContestRecord record, Authentication auth) {
        record.setUserId(getUserId(auth));
        return service.addRecord(record);
    }

    @GetMapping
    public Map<String, Object> getStats(Authentication auth) {
        return service.getStats(getUserId(auth));
    }
}
