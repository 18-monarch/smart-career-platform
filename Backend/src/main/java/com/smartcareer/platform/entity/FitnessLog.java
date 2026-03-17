package com.smartcareer.platform.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "fitness_logs")
public class FitnessLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private String date;
    private int steps;
    private double sleepHours;
    private int waterGlasses;
    private int workoutMinutes;

    public FitnessLog() {}

    public Long getId() { return id; }
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }
    public int getSteps() { return steps; }
    public void setSteps(int steps) { this.steps = steps; }
    public double getSleepHours() { return sleepHours; }
    public void setSleepHours(double sleepHours) { this.sleepHours = sleepHours; }
    public int getWaterGlasses() { return waterGlasses; }
    public void setWaterGlasses(int waterGlasses) { this.waterGlasses = waterGlasses; }
    public int getWorkoutMinutes() { return workoutMinutes; }
    public void setWorkoutMinutes(int workoutMinutes) { this.workoutMinutes = workoutMinutes; }
}
