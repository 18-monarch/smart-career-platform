package com.smartcareer.platform.dto.codingtracker;

import java.util.ArrayList;
import java.util.List;

public class LeetCodeStats {

    private int totalSolved;
    private int easy;
    private int medium;
    private int hard;
    private int rank;
    private List<CodingSubmission> recentSubmissions = new ArrayList<>();

    public LeetCodeStats() {
    }

    public int getTotalSolved() {
        return totalSolved;
    }

    public void setTotalSolved(int totalSolved) {
        this.totalSolved = totalSolved;
    }

    public int getEasy() {
        return easy;
    }

    public void setEasy(int easy) {
        this.easy = easy;
    }

    public int getMedium() {
        return medium;
    }

    public void setMedium(int medium) {
        this.medium = medium;
    }

    public int getHard() {
        return hard;
    }

    public void setHard(int hard) {
        this.hard = hard;
    }

    public int getRank() {
        return rank;
    }

    public void setRank(int rank) {
        this.rank = rank;
    }

    public List<CodingSubmission> getRecentSubmissions() {
        return recentSubmissions;
    }

    public void setRecentSubmissions(List<CodingSubmission> recentSubmissions) {
        this.recentSubmissions = recentSubmissions;
    }
}