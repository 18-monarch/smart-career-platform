package com.smartcareer.platform.repository;

import com.smartcareer.platform.entity.ContestRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ContestRecordRepository extends JpaRepository<ContestRecord, Long> {
    List<ContestRecord> findByUserIdOrderByContestDateAsc(Long userId);
}
