package com.smartcareer.platform.repository;

import com.smartcareer.platform.entity.FitnessLog;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FitnessLogRepository extends JpaRepository<FitnessLog, Long> {
    List<FitnessLog> findByUserIdOrderByDateAsc(Long userId);
}
