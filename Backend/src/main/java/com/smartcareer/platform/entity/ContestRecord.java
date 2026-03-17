package com.smartcareer.platform.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "contest_records")
public class ContestRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private String contestName;
    private String platform;
    private LocalDate contestDate;
    private int globalRank;
    private int totalParticipants;
    private int problemsSolved;
    private int totalProblems;
    private int ratingDelta;
    private int ratingAfter;

    public ContestRecord() {}

    public Long getId() { return id; }
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public String getContestName() { return contestName; }
    public void setContestName(String contestName) { this.contestName = contestName; }
    public String getPlatform() { return platform; }
    public void setPlatform(String platform) { this.platform = platform; }
    public LocalDate getContestDate() { return contestDate; }
    public void setContestDate(LocalDate contestDate) { this.contestDate = contestDate; }
    public int getGlobalRank() { return globalRank; }
    public void setGlobalRank(int globalRank) { this.globalRank = globalRank; }
    public int getTotalParticipants() { return totalParticipants; }
    public void setTotalParticipants(int totalParticipants) { this.totalParticipants = totalParticipants; }
    public int getProblemsSolved() { return problemsSolved; }
    public void setProblemsSolved(int problemsSolved) { this.problemsSolved = problemsSolved; }
    public int getTotalProblems() { return totalProblems; }
    public void setTotalProblems(int totalProblems) { this.totalProblems = totalProblems; }
    public int getRatingDelta() { return ratingDelta; }
    public void setRatingDelta(int ratingDelta) { this.ratingDelta = ratingDelta; }
    public int getRatingAfter() { return ratingAfter; }
    public void setRatingAfter(int ratingAfter) { this.ratingAfter = ratingAfter; }
}
