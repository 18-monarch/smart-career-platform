package com.smartcareer.platform.dto;

public class LeetcodeStatsDTO {

    private int easy;
    private int medium;
    private int hard;

    public LeetcodeStatsDTO(int easy,int medium,int hard){
        this.easy = easy;
        this.medium = medium;
        this.hard = hard;
    }

    public int getEasy(){ return easy; }
    public int getMedium(){ return medium; }
    public int getHard(){ return hard; }
}