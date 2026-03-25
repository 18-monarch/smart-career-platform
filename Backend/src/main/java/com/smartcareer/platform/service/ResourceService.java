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
        List<Resource> resources = repo.findAll();
        if (resources.isEmpty()) {
            return getDefaultResources();
        }
        return resources;
    }

    private List<Resource> getDefaultResources() {
        List<Resource> defaults = new java.util.ArrayList<>();
        defaults.add(createResource("Cracking the Coding Interview", "Book", "Core", "https://example.com/ctci"));
        defaults.add(createResource("LeetCode Patterns", "Guide", "Coding", "https://leetcode.com"));
        defaults.add(createResource("System Design Primer", "Course", "Architecture", "https://github.com/donnemartin/system-design-primer"));
        return defaults;
    }

    private Resource createResource(String title, String type, String category, String url) {
        Resource r = new Resource();
        r.setTitle(title);
        r.setType(type);
        r.setCategory(category);
        r.setUrl(url);
        return r;
    }

    public List<Resource> getByCategory(String category) {
        return repo.findByCategory(category);
    }
}
