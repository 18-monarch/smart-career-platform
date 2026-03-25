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
        
        if (skills.isEmpty()) {
            return getDefaultSkills();
        }

        List<Map<String, Object>> result = new ArrayList<>();
        for (SkillAssessment s : skills) {
            result.add(convertToMap(s));
        }
        return result;
    }

    private List<Map<String, Object>> getDefaultSkills() {
        List<Map<String, Object>> defaults = new ArrayList<>();
        defaults.add(createMockSkill("Java", 4, 8, "Backend"));
        defaults.add(createMockSkill("Data Structures", 5, 9, "Core"));
        defaults.add(createMockSkill("System Design", 2, 7, "Architecture"));
        defaults.add(createMockSkill("React", 3, 8, "Frontend"));
        defaults.add(createMockSkill("SQL", 6, 8, "Database"));
        return defaults;
    }

    private Map<String, Object> createMockSkill(String name, int current, int target, String cat) {
        Map<String, Object> m = new LinkedHashMap<>();
        m.put("skillName", name);
        m.put("currentLevel", current);
        m.put("targetLevel", target);
        m.put("gap", target - current);
        m.put("category", cat);
        return m;
    }

    private Map<String, Object> convertToMap(SkillAssessment s) {
        Map<String, Object> m = new LinkedHashMap<>();
        m.put("id", s.getId());
        m.put("skillName", s.getSkillName());
        m.put("currentLevel", s.getCurrentLevel());
        m.put("targetLevel", s.getTargetLevel());
        m.put("gap", s.getTargetLevel() - s.getCurrentLevel());
        m.put("category", s.getCategory());
        return m;
    }
}
