package com.smartcareer.platform.controller;

import com.smartcareer.platform.entity.CodingActivity;
import com.smartcareer.platform.entity.User;
import com.smartcareer.platform.service.CodingActivityService;
import com.smartcareer.platform.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/coding")
public class CodingController {

    private final CodingActivityService codingService;
    private final UserService userService;

    public CodingController(CodingActivityService codingService, UserService userService) {
        this.codingService = codingService;
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<CodingActivity>> getActivities(Authentication authentication) {
        String email = authentication.getName();
        Optional<User> user = userService.findByEmail(email);

        if (user.isPresent()) {
            return ResponseEntity.ok(codingService.getActivitiesByUser(user.get().getId()));
        }

        return ResponseEntity.status(401).build();
    }

    @PostMapping
    public ResponseEntity<CodingActivity> saveActivity(@RequestBody CodingActivity activity, Authentication authentication) {
        String email = authentication.getName();
        Optional<User> user = userService.findByEmail(email);

        if (user.isPresent()) {
            activity.setUserId(user.get().getId());
            return ResponseEntity.ok(codingService.saveActivity(activity));
        }

        return ResponseEntity.status(401).build();
    }
}
