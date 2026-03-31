package com.smartcareer.platform.dto.codingtracker;

import lombok.Data;

@Data
public class CodingTrackerRequest {
    private Long userId;
    private String leetcodeUsername;
    private String codeforcesHandle;
}
