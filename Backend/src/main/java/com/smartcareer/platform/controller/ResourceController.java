package com.smartcareer.platform.controller;

import com.smartcareer.platform.entity.Resource;
import com.smartcareer.platform.service.ResourceService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/resources")
public class ResourceController {

    private final ResourceService service;

    public ResourceController(ResourceService service) {
        this.service = service;
    }

    @PostMapping
    public Resource save(@RequestBody Resource resource) {
        return service.save(resource);
    }

    @GetMapping
    public List<Resource> getAll(@RequestParam(required = false) String category) {
        if (category != null && !category.isBlank()) {
            return service.getByCategory(category);
        }
        return service.getAll();
    }
}
