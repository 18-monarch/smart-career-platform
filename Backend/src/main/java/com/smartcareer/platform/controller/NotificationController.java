package com.smartcareer.platform.controller;

import com.smartcareer.platform.entity.Notification;
import com.smartcareer.platform.repository.NotificationRepository;
import com.smartcareer.platform.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationRepository notificationRepo;
    private final UserRepository userRepo;

    public NotificationController(NotificationRepository notificationRepo, UserRepository userRepo) {
        this.notificationRepo = notificationRepo;
        this.userRepo = userRepo;
    }

    private Long getUserId(Authentication auth) {
        return userRepo.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"))
                .getId();
    }

    @GetMapping
    public List<Notification> getNotifications(Authentication auth) {
        return notificationRepo.findByUserIdOrderByCreatedAtDesc(getUserId(auth));
    }

    @PostMapping("/read")
    public void markAsRead(Authentication auth) {
        List<Notification> unread = notificationRepo.findByUserIdOrderByCreatedAtDesc(getUserId(auth));
        unread.forEach(n -> n.setRead(true));
        notificationRepo.saveAll(unread);
    }
}
