package com.smartcareer.platform.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "productivity_logs")
public class ProductivityLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private LocalDate date;
    private double learningHours;
    private double distractionHours;
    private int focusSessions;
    private int productivityScore;

    public ProductivityLog() {}

    public Long getId() { return id; }
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }
    public double getLearningHours() { return learningHours; }
    public void setLearningHours(double learningHours) { this.learningHours = learningHours; }
    public double getDistractionHours() { return distractionHours; }
    public void setDistractionHours(double distractionHours) { this.distractionHours = distractionHours; }
    public int getFocusSessions() { return focusSessions; }
    public void setFocusSessions(int focusSessions) { this.focusSessions = focusSessions; }
    public int getProductivityScore() { return productivityScore; }
    public void setProductivityScore(int productivityScore) { this.productivityScore = productivityScore; }
}
