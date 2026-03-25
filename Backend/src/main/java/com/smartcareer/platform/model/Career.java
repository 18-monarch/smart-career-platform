package com.smartcareer.platform.model;

import java.util.List;

public class Career {

    public int id;
    public String title;
    public String description;
    public List<String> skills;

    public String difficulty;
    public String duration;
    public String salary;
    public String demand;

    public int trendScore;

    // real-world additions
    public int jobsCount;
    public String roadmapId;

    public Career() {}
}