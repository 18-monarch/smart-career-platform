package com.smartcareer.platform.controller;

import com.smartcareer.platform.entity.FitnessLog;
import com.smartcareer.platform.repository.UserRepository;
import com.smartcareer.platform.service.FitnessService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/fitness")
public class FitnessController {

    private final FitnessService service;
    private final UserRepository userRepo;

    public FitnessController(FitnessService service, UserRepository userRepo) {
        this.service = service;
        this.userRepo = userRepo;
    }

    private Long getUserId(Authentication auth) {
        return userRepo.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"))
                .getId();
    }

    @PostMapping
    public FitnessLog log(@RequestBody FitnessLog log, Authentication auth) {
        log.setUserId(getUserId(auth));
        return service.log(log);
    }

    @GetMapping
    public Map<String, Object> getStats(Authentication auth) {
        return service.getStats(getUserId(auth));
    }
}
