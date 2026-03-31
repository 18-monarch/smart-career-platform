package com.smartcareer.platform.controller;

import com.smartcareer.platform.dto.codingtracker.CodingTrackerRequest;
import com.smartcareer.platform.dto.codingtracker.CodingTrackerResponse;
import com.smartcareer.platform.service.ExternalCodingTrackerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/coding-tracker")
public class ExternalCodingTrackerController {

    private final ExternalCodingTrackerService trackerService;

    public ExternalCodingTrackerController(ExternalCodingTrackerService trackerService) {
        this.trackerService = trackerService;
    }

    @PostMapping
    public ResponseEntity<CodingTrackerResponse> getCodingStats(@RequestBody CodingTrackerRequest request) {
        CodingTrackerResponse response = trackerService.fetchCodingStats(
                request.getLeetcodeUsername(), 
                request.getCodeforcesHandle()
        );
        return ResponseEntity.ok(response);
    }
}
