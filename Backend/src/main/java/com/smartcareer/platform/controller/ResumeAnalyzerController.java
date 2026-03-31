package com.smartcareer.platform.controller;

import com.smartcareer.platform.service.ResumeAnalysisService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/api/resume-analysis")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5174",
        "https://smart-career-platform-seven.vercel.app"
})
public class ResumeAnalyzerController {

    private final ResumeAnalysisService resumeAnalysisService;

    public ResumeAnalyzerController(ResumeAnalysisService resumeAnalysisService) {
        this.resumeAnalysisService = resumeAnalysisService;
    }

    @GetMapping
    public ResponseEntity<?> getResumeAnalysis() {
        return ResponseEntity.ok(Map.of(
                "score", 0,
                "status", "Upload Resume",
                "message", "Upload a resume to generate a real analysis.",
                "sections", new Object[]{},
                "suggestions", new Object[]{},
                "keywords", Map.of(
                        "coverage", 0,
                        "found", 0,
                        "missing", 0,
                        "suggested", 0,
                        "relevance", "N/A"
                )
        ));
    }

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> uploadResumeAndAnalyze(@RequestParam("file") MultipartFile file) {
        if (file == null || file.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "No file uploaded"));
        }

        String fileName = file.getOriginalFilename() == null ? "" : file.getOriginalFilename().toLowerCase();

        boolean validExtension =
                fileName.endsWith(".pdf") ||
                        fileName.endsWith(".docx");

        if (!validExtension) {
            return ResponseEntity.badRequest().body(Map.of(
                    "error", "Only PDF and DOCX are supported in the real analyzer"
            ));
        }

        if (file.getSize() > 5 * 1024 * 1024) {
            return ResponseEntity.badRequest().body(Map.of(
                    "error", "File size must be 5MB or less"
            ));
        }

        return ResponseEntity.ok(resumeAnalysisService.analyzeResume(file));
    }
}