package com.smartcareer.platform.repository;

import com.smartcareer.platform.entity.ProductivityLog;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProductivityLogRepository extends JpaRepository<ProductivityLog, Long> {
    List<ProductivityLog> findByUserIdOrderByDateAsc(Long userId);
}
