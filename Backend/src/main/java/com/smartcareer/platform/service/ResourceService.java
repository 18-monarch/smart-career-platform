package com.smartcareer.platform.service;

import com.smartcareer.platform.entity.Resource;
import com.smartcareer.platform.repository.ResourceRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResourceService {

    private final ResourceRepository repo;

    public ResourceService(ResourceRepository repo) {
        this.repo = repo;
    }

    public Resource save(Resource resource) {
        return repo.save(resource);
    }

    public List<Resource> getAll() {
        return repo.findAll();
    }

    public List<Resource> getByCategory(String category) {
        return repo.findByCategory(category);
    }
}
