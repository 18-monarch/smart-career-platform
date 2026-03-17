package com.smartcareer.platform.repository;

import com.smartcareer.platform.entity.RoadmapMilestone;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RoadmapMilestoneRepository extends JpaRepository<RoadmapMilestone, Long> {
    List<RoadmapMilestone> findByUserIdOrderBySortOrderAsc(Long userId);
}
