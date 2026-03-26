package com.smartcareer.platform.controller;

import com.smartcareer.platform.entity.SkillAssessment;
import com.smartcareer.platform.repository.UserRepository;
import com.smartcareer.platform.service.SkillGapService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/skills")
public class SkillGapController {

    private final SkillGapService service;
    private final UserRepository userRepo;

    public SkillGapController(SkillGapService service, UserRepository userRepo) {
        this.service = service;
        this.userRepo = userRepo;
    }

    private Long getUserId(Authentication auth) {
        return userRepo.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"))
                .getId();
    }

    @PostMapping
    public SkillAssessment save(@RequestBody SkillAssessment skill, Authentication auth) {
        skill.setUserId(getUserId(auth));
        return service.saveSkill(skill);
    }

    @GetMapping
    public List<Map<String, Object>> getGap(Authentication auth) {
        return service.getSkillGap(getUserId(auth));
    }
}
