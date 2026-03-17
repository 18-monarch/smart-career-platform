package com.smartcareer.platform.dto;


public class GithubStatsDTO {

    private int totalCommits;
    private int pullRequests;

    public GithubStatsDTO(int totalCommits, int pullRequests) {
        this.totalCommits = totalCommits;
        this.pullRequests = pullRequests;
    }

    public int getTotalCommits() {
        return totalCommits;
    }

    public int getPullRequests() {
        return pullRequests;
    }
}