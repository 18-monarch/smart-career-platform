package com.smartcareer.platform.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "notifications")
@Data
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private String message;
    private LocalDateTime createdAt;
    private boolean isRead;

    public Notification() {
        this.createdAt = LocalDateTime.now();
        this.isRead = false;
    }
}
