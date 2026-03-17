package com.smartcareer.platform.service;

import com.smartcareer.platform.entity.SkillAssessment;
import com.smartcareer.platform.repository.SkillAssessmentRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class SkillGapService {

    private final SkillAssessmentRepository repo;

    public SkillGapService(SkillAssessmentRepository repo) {
        this.repo = repo;
    }

    public SkillAssessment saveSkill(SkillAssessment skill) {
        return repo.save(skill);
    }

    public List<Map<String, Object>> getSkillGap(Long userId) {
        List<SkillAssessment> skills = repo.findByUserId(userId);
        List<Map<String, Object>> result = new ArrayList<>();
        for (SkillAssessment s : skills) {
            Map<String, Object> m = new LinkedHashMap<>();
            m.put("id", s.getId());
            m.put("skillName", s.getSkillName());
            m.put("currentLevel", s.getCurrentLevel());
            m.put("targetLevel", s.getTargetLevel());
            m.put("gap", s.getTargetLevel() - s.getCurrentLevel());
            m.put("category", s.getCategory());
            result.add(m);
        }
        return result;
    }
}
