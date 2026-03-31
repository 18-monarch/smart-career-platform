package com.smartcareer.platform.dto.codingtracker;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CodingTrackerResponse {
    private LeetCodeStats leetcode;
    private CodeforcesStats codeforces;
}
