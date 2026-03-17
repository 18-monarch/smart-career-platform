package com.smartcareer.platform.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "roadmap_milestones")
public class RoadmapMilestone {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private String careerGoal;
    private String phase;
    private String milestone;
    private boolean completed;
    private int sortOrder;

    public RoadmapMilestone() {}

    public Long getId() { return id; }
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public String getCareerGoal() { return careerGoal; }
    public void setCareerGoal(String careerGoal) { this.careerGoal = careerGoal; }
    public String getPhase() { return phase; }
    public void setPhase(String phase) { this.phase = phase; }
    public String getMilestone() { return milestone; }
    public void setMilestone(String milestone) { this.milestone = milestone; }
    public boolean isCompleted() { return completed; }
    public void setCompleted(boolean completed) { this.completed = completed; }
    public int getSortOrder() { return sortOrder; }
    public void setSortOrder(int sortOrder) { this.sortOrder = sortOrder; }
}
