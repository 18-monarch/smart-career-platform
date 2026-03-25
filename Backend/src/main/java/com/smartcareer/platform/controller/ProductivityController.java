package com.smartcareer.platform.controller;

import com.smartcareer.platform.entity.ProductivityLog;
import com.smartcareer.platform.service.ProductivityService;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/productivity")
public class ProductivityController {

    private final ProductivityService service;

    public ProductivityController(ProductivityService service) {
        this.service = service;
    }

    @PostMapping
    public ProductivityLog log(@RequestBody ProductivityLog log) {
        return service.log(log);
    }

    @GetMapping("/{userId}")
    public Map<String, Object> getStats(@PathVariable Long userId) {
        return service.getStats(userId);
    }
}
