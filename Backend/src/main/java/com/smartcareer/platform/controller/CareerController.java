package com.smartcareer.platform.controller;

import com.smartcareer.platform.model.Career;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/career")
public class CareerController {

    @GetMapping
    public List<Career> getCareers() {

        List<Career> list = new ArrayList<>();

        list.add(createCareer(1,"Machine Learning Engineer","Build AI models",
                List.of("Python","TensorFlow","Deep Learning"),
                "Advanced","12-18 months","₹12L - ₹30L","Very High",
                95,15432,"ml"));

        list.add(createCareer(2,"Full Stack Developer","Build web apps",
                List.of("React","Node.js","MongoDB"),
                "Intermediate","8-12 months","₹6L - ₹20L","High",
                88,21345,"fs"));

        list.add(createCareer(3,"Data Scientist","Analyze data",
                List.of("Python","SQL","ML"),
                "Advanced","10-16 months","₹10L - ₹25L","Very High",
                92,18221,"ds"));

        return list;
    }

    @PostMapping("/select")
    public Map<String,String> select(@RequestBody Map<String,String> body){
        return Map.of("status","saved");
    }

    private Career createCareer(int id,String title,String desc,List<String> skills,
                                String difficulty,String duration,String salary,String demand,
                                int trendScore,int jobs,String roadmapId){

        Career c = new Career();
        c.id=id;
        c.title=title;
        c.description=desc;
        c.skills=skills;
        c.difficulty=difficulty;
        c.duration=duration;
        c.salary=salary;
        c.demand=demand;
        c.trendScore=trendScore;
        c.jobsCount=jobs;
        c.roadmapId=roadmapId;

        return c;
    }
}