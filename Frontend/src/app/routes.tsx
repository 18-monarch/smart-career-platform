import { createBrowserRouter } from "react-router";
import { DashboardLayout } from "./components/DashboardLayout";
import { Login } from "./pages/Login";
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
import Register from "./pages/Register";

export const router = createBrowserRouter([
  {
  path: "/register",
  Component: Register,
  },
  
  {
    path: "/login",
    Component: Login,
  },

  {
    path: "/register",
    Component: Register,
  },

  {
    path: "/",
    Component: DashboardLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "career-path", Component: CareerPath },
      { path: "skill-gap", Component: SkillGap },
      { path: "roadmap", Component: Roadmap },
      { path: "resources", Component: Resources },
      { path: "coding-tracker", Component: CodingTracker },
      { path: "contest-tracker", Component: ContestTracker },
      { path: "internships", Component: InternshipRecommendation },
      { path: "internship-prep", Component: InternshipPreparation },
      { path: "mock-test", Component: MockTest },
      { path: "mock-interview", Component: MockInterview },
      { path: "resume-analyzer", Component: ResumeAnalyzer },
      { path: "jobs", Component: JobRecommendation },
      { path: "productivity", Component: ProductivityTracker },
      { path: "fitness", Component: FitnessBalance },
      { path: "analytics", Component: Analytics },
      { path: "*", Component: NotFound },
    ],
  },
]);