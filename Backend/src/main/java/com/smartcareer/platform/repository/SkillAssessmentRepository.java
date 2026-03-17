package com.smartcareer.platform.repository;

import com.smartcareer.platform.entity.SkillAssessment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SkillAssessmentRepository extends JpaRepository<SkillAssessment, Long> {
    List<SkillAssessment> findByUserId(Long userId);
}
