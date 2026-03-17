package com.smartcareer.platform.controller;


import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import com.smartcareer.platform.service.CareerRecommendationService;
import com.smartcareer.platform.dto.CareerRecommendationDTO;

@RestController
@RequestMapping("/api/career")
public class CareerRecommendationController {

    @Autowired
    private CareerRecommendationService service;

    @GetMapping("/recommendation")
    public CareerRecommendationDTO getRecommendation(
            @RequestParam String github){

        return service.generate(github);
    }
}