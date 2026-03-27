import React from "react";
import { createBrowserRouter } from "react-router-dom";

import { DashboardLayout } from "./components/DashboardLayout";
import { Login } from "./pages/Login";
import Register from "./pages/Register";

import { Dashboard } from "./pages/Dashboard";
import { CareerPath } from "./pages/CareerPath";
import { SkillGap } from "./pages/SkillGap";
import { Roadmap } from "./pages/Roadmap";
import { Resources } from "./pages/Resources";
import { CodingTracker } from "./pages/CodingTracker";
import { ContestTracker } from "./pages/ContestTracker";
import { InternshipRecommendation } from "./pages/InternshipRecommendation";
import { InternshipPreparation } from "./pages/InternshipPreparation";
import { MockTest } from "./pages/MockTest";
import { MockInterview } from "./pages/MockInterview";
import { ResumeAnalyzer } from "./pages/ResumeAnalyzer";
import { JobRecommendation } from "./pages/JobRecommendation";
import { ProductivityTracker } from "./pages/ProductivityTracker";
import { FitnessBalance } from "./pages/FitnessBalance";
import { Analytics } from "./pages/Analytics";
import { NotFound } from "./pages/NotFound";

import { AuthWrapper } from "./components/AuthWrapper";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },

  {
    path: "/",
    element: <AuthWrapper />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: "dashboard", element: <Dashboard /> },

          { path: "career-path", element: <CareerPath /> },
          { path: "skill-gap", element: <SkillGap /> },
          { path: "roadmap", element: <Roadmap /> },
          { path: "resources", element: <Resources /> },
          { path: "coding-tracker", element: <CodingTracker /> },
          { path: "contest-tracker", element: <ContestTracker /> },
          { path: "internships", element: <InternshipRecommendation /> },
          { path: "internship-prep", element: <InternshipPreparation /> },
          { path: "mock-test", element: <MockTest /> },
          { path: "mock-interview", element: <MockInterview /> },
          { path: "resume-analyzer", element: <ResumeAnalyzer /> },
          { path: "jobs", element: <JobRecommendation /> },
          { path: "productivity", element: <ProductivityTracker /> },
          { path: "fitness", element: <FitnessBalance /> },
          { path: "analytics", element: <Analytics /> },

          { path: "*", element: <NotFound /> },
        ],
      },
    ],
  },
]);