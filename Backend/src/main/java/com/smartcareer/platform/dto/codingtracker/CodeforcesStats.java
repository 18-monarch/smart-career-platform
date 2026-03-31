package com.smartcareer.platform.dto.codingtracker;

import lombok.Data;
import java.util.List;
import java.util.ArrayList;

@Data
public class CodeforcesStats {
    private int totalSolved;
    private int submissions;
    private int rating;
    private List<CodingSubmission> recentActivity = new ArrayList<>();
}
