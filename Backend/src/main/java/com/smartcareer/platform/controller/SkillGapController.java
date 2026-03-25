package com.smartcareer.platform.controller;

import com.smartcareer.platform.entity.SkillAssessment;
import com.smartcareer.platform.service.SkillGapService;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/skills")
public class SkillGapController {

    private final SkillGapService service;

    public SkillGapController(SkillGapService service) {
        this.service = service;
    }

    @PostMapping
    public SkillAssessment save(@RequestBody SkillAssessment skill) {
        return service.saveSkill(skill);
    }

    @GetMapping("/{userId}")
    public List<Map<String, Object>> getGap(@PathVariable Long userId) {
        return service.getSkillGap(userId);
    }
}
