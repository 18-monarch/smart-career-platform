package com.smartcareer.platform.repository;

import com.smartcareer.platform.entity.CodingActivity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CodingActivityRepository extends JpaRepository<CodingActivity, Long> {

    List<CodingActivity> findByUserId(Long userId);

}