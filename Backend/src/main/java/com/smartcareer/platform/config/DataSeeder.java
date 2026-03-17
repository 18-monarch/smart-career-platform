package com.smartcareer.platform.config;

import com.smartcareer.platform.entity.*;
import com.smartcareer.platform.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepo;
    private final CodingActivityRepository codingRepo;
    private final ContestRecordRepository contestRepo;
    private final ProductivityLogRepository productivityRepo;
    private final SkillAssessmentRepository skillRepo;
    private final FitnessLogRepository fitnessRepo;
    private final RoadmapMilestoneRepository roadmapRepo;
    private final ResourceRepository resourceRepo;

    public DataSeeder(
            UserRepository userRepo,
            CodingActivityRepository codingRepo,
            ContestRecordRepository contestRepo,
            ProductivityLogRepository productivityRepo,
            SkillAssessmentRepository skillRepo,
            FitnessLogRepository fitnessRepo,
            RoadmapMilestoneRepository roadmapRepo,
            ResourceRepository resourceRepo) {
        this.userRepo = userRepo;
        this.codingRepo = codingRepo;
        this.contestRepo = contestRepo;
        this.productivityRepo = productivityRepo;
        this.skillRepo = skillRepo;
        this.fitnessRepo = fitnessRepo;
        this.roadmapRepo = roadmapRepo;
        this.resourceRepo = resourceRepo;
    }

    @Override
    public void run(String... args) {
        // Only seed if DB is empty
        if (userRepo.count() > 0) return;

        // ─── User ────────────────────────────────────────────────────────────
        User user = new User();
        user.setName("Mohit Sharma");
        user.setEmail("mohit@smartcareer.com");
        user.setPassword("password123");
        userRepo.save(user);
        Long uid = 1L;

        // ─── Coding Activity (14 days) ────────────────────────────────────────
        String[][] codingData = {
            {"LeetCode", "5", "90"}, {"LeetCode", "7", "120"}, {"Codeforces", "3", "60"},
            {"LeetCode", "8", "150"}, {"HackerRank", "4", "75"}, {"LeetCode", "6", "100"},
            {"LeetCode", "4", "80"},  {"Codeforces", "5", "90"}, {"LeetCode", "9", "160"},
            {"LeetCode", "7", "130"}, {"HackerRank", "6", "100"},{"LeetCode", "5", "90"},
            {"LeetCode", "8", "140"}, {"LeetCode", "10", "180"}
        };
        for (int i = 0; i < codingData.length; i++) {
            CodingActivity a = new CodingActivity();
            a.setUserId(uid);
            a.setPlatform(codingData[i][0]);
            a.setProblemsSolved(Integer.parseInt(codingData[i][1]));
            a.setTimeSpent(Integer.parseInt(codingData[i][2]));
            a.setDate(LocalDate.now().minusDays(codingData.length - 1 - i));
            codingRepo.save(a);
        }

        // ─── Contest Records ───────────────────────────────────────────────────
        Object[][] contests = {
            {"Codeforces Round 870", "Codeforces", 45, 1200, 1550, 3, 4, -15, 1535},
            {"LeetCode Weekly 377", "LeetCode",   312, 28000, 1700, 2, 4, +32, 1567},
            {"Codeforces Round 885", "Codeforces",  89, 14000, 1700, 4, 5, +58, 1625},
            {"LeetCode Biweekly 125","LeetCode",   204, 25000, 1750, 3, 4, +43, 1668},
            {"Codeforces Round 901", "Codeforces",  56, 16000, 1800, 4, 5, +75, 1743},
            {"LeetCode Weekly 388", "LeetCode",   187, 31000, 1800, 4, 4, +82, 1825},
        };
        LocalDate contestStart = LocalDate.now().minusDays(80);
        for (int i = 0; i < contests.length; i++) {
            ContestRecord c = new ContestRecord();
            c.setUserId(uid);
            c.setContestName((String) contests[i][0]);
            c.setPlatform((String) contests[i][1]);
            c.setGlobalRank((int) contests[i][2]);
            c.setTotalParticipants((int) contests[i][3]);
            c.setTotalProblems((int) contests[i][4]);
            c.setProblemsSolved((int) contests[i][5]);
            c.setTotalProblems((int) contests[i][6]);
            c.setRatingDelta((int) contests[i][7]);
            c.setRatingAfter((int) contests[i][8]);
            c.setContestDate(contestStart.plusDays(i * 12));
            contestRepo.save(c);
        }

        // ─── Productivity Logs (14 days) ──────────────────────────────────────
        double[][] prodData = {
            {6.5, 1.2, 4, 82}, {7.0, 0.8, 5, 87}, {5.5, 2.1, 3, 72},
            {8.0, 0.5, 6, 91}, {7.5, 1.0, 5, 88}, {4.0, 3.5, 2, 60},
            {3.5, 2.0, 2, 65}, {7.0, 0.9, 5, 86}, {8.5, 0.4, 6, 93},
            {7.2, 1.1, 5, 85}, {6.8, 1.5, 4, 81}, {8.0, 0.6, 6, 90},
            {7.5, 0.8, 5, 88}, {9.0, 0.3, 7, 95}
        };
        for (int i = 0; i < prodData.length; i++) {
            ProductivityLog p = new ProductivityLog();
            p.setUserId(uid);
            p.setDate(LocalDate.now().minusDays(prodData.length - 1 - i));
            p.setLearningHours(prodData[i][0]);
            p.setDistractionHours(prodData[i][1]);
            p.setFocusSessions((int) prodData[i][2]);
            p.setProductivityScore((int) prodData[i][3]);
            productivityRepo.save(p);
        }

        // ─── Skills ───────────────────────────────────────────────────────────
        Object[][] skills = {
            {"Java",                8, 10, "Backend"},
            {"Spring Boot",         7, 10, "Backend"},
            {"Python",              7,  9, "General"},
            {"React",               7, 10, "Frontend"},
            {"TypeScript",          6,  9, "Frontend"},
            {"MySQL",               7,  9, "Database"},
            {"Data Structures",     8, 10, "CS Fundamentals"},
            {"System Design",       5,  9, "Architecture"},
            {"Machine Learning",    4,  8, "AI/ML"},
            {"Docker",              5,  8, "DevOps"},
        };
        for (Object[] s : skills) {
            SkillAssessment sa = new SkillAssessment();
            sa.setUserId(uid);
            sa.setSkillName((String) s[0]);
            sa.setCurrentLevel((int) s[1]);
            sa.setTargetLevel((int) s[2]);
            sa.setCategory((String) s[3]);
            skillRepo.save(sa);
        }

        // ─── Fitness Logs (14 days) ───────────────────────────────────────────
        int[][] fitnessData = {
            {8500, 7, 7, 45}, {10200, 8, 8, 60}, {7800, 6, 7, 30},
            {12000, 8, 8, 55}, {9500, 8, 7, 40}, {15000, 8, 9, 90},
            {11000, 9, 8, 45}, {9200, 7, 7, 50}, {10800, 7, 8, 60},
            {8900, 6, 7, 35},  {11500, 8, 8, 55}, {13000, 8, 8, 70},
            {9700, 7, 8, 45},  {10500, 9, 7, 50}
        };
        for (int i = 0; i < fitnessData.length; i++) {
            FitnessLog f = new FitnessLog();
            f.setUserId(uid);
            f.setDate(LocalDate.now().minusDays(fitnessData.length - 1 - i).toString());
            f.setSteps(fitnessData[i][0]);
            f.setWaterGlasses(fitnessData[i][1]);
            f.setSleepHours(fitnessData[i][2]);
            f.setWorkoutMinutes(fitnessData[i][3]);
            fitnessRepo.save(f);
        }

        // ─── Roadmap Milestones ────────────────────────────────────────────────
        Object[][] milestones = {
            {"Foundation",    "Learn Java Core",               true,  1},
            {"Foundation",    "Master Data Structures",         true,  2},
            {"Foundation",    "Solve 100 LeetCode Problems",    true,  3},
            {"Foundation",    "Learn Git & Version Control",    true,  4},
            {"Core Backend",  "Spring Boot Basics",             true,  5},
            {"Core Backend",  "REST API Development",           true,  6},
            {"Core Backend",  "MySQL & JPA Integration",        true,  7},
            {"Core Backend",  "Authentication with JWT",        false, 8},
            {"Frontend",      "HTML, CSS, JavaScript",          true,  9},
            {"Frontend",      "React & TypeScript",             true,  10},
            {"Frontend",      "State Management (Redux)",       false, 11},
            {"Frontend",      "API Integration with Axios",     false, 12},
            {"System Design", "Learn Database Design",          false, 13},
            {"System Design", "Study System Design Patterns",   false, 14},
            {"System Design", "Design a Scalable App",          false, 15},
            {"Deployment",    "Docker & Containerization",      false, 16},
            {"Deployment",    "CI/CD Pipeline Setup",           false, 17},
            {"Deployment",    "Deploy to AWS/GCP",              false, 18},
        };
        for (Object[] m : milestones) {
            RoadmapMilestone rm = new RoadmapMilestone();
            rm.setUserId(uid);
            rm.setPhase((String) m[0]);
            rm.setMilestone((String) m[1]);
            rm.setCompleted((boolean) m[2]);
            rm.setSortOrder((int) m[3]);
            rm.setCareerGoal("Full Stack Developer");
            roadmapRepo.save(rm);
        }

        // ─── Resources ─────────────────────────────────────────────────────────
        Object[][] resources = {
            {"Spring Boot Official Docs",  "Documentation", "https://spring.io/projects/spring-boot", "Courses",       "Official Spring Boot reference documentation"},
            {"CS50 by Harvard",            "Course",        "https://cs50.harvard.edu",                "Courses",       "Introduction to computer science - free"},
            {"LeetCode DSA Sheet",         "Practice",      "https://leetcode.com/explore",            "Practice",      "Curated DSA problems organized by topic"},
            {"React Official Docs",        "Documentation", "https://react.dev",                       "Courses",       "Official React documentation and tutorials"},
            {"System Design Primer",       "Tutorial",      "https://github.com/donnemartin/system-design-primer", "Tutorials", "Learn how to design large-scale systems"},
            {"JavaBrains YouTube",         "Tutorial",      "https://youtube.com/javabrains",          "Tutorials",     "Java and Spring Boot video tutorials"},
            {"Neetcode 150 Roadmap",       "Practice",      "https://neetcode.io/roadmap",             "Practice",      "150 LeetCode problems curated for interviews"},
            {"The Odin Project",           "Course",        "https://theodinproject.com",              "Projects",      "Free full-stack web development curriculum"},
            {"Docker Getting Started",     "Tutorial",      "https://docs.docker.com/get-started",    "Tutorials",     "Beginner-friendly Docker official tutorial"},
            {"Kaggle ML Courses",          "Course",        "https://kaggle.com/learn",                "Courses",       "Free machine learning micro-courses"},
        };
        for (Object[] r : resources) {
            Resource res = new Resource();
            res.setTitle((String) r[0]);
            res.setType((String) r[1]);
            res.setUrl((String) r[2]);
            res.setCategory((String) r[3]);
            res.setDescription((String) r[4]);
            resourceRepo.save(res);
        }

        System.out.println("✅ DataSeeder: Sample data seeded successfully!");
    }
}
