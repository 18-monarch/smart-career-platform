package com.smartcareer.platform.controller;

import com.smartcareer.platform.entity.Notification;
import com.smartcareer.platform.repository.NotificationRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationRepository notificationRepo;

    public NotificationController(NotificationRepository notificationRepo) {
        this.notificationRepo = notificationRepo;
    }

    @GetMapping("/{userId}")
    public List<Notification> getNotifications(@PathVariable Long userId) {
        return notificationRepo.findByUserIdOrderByCreatedAtDesc(userId);
    }

    @PostMapping("/{userId}/read")
    public void markAsRead(@PathVariable Long userId) {
        List<Notification> unread = notificationRepo.findByUserIdOrderByCreatedAtDesc(userId);
        unread.forEach(n -> n.setRead(true));
        notificationRepo.saveAll(unread);
    }
}
