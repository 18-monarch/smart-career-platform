import { Outlet, Link, useLocation } from "react-router";
import {
  LayoutDashboard,
  Target,
  GitCompare,
  Map,
  BookOpen,
  Code,
  Trophy,
  Briefcase,
  GraduationCap,
  FileText,
  MessageSquare,
  FileCheck,
  Search,
  Activity,
  Heart,
  BarChart3,
  Bell,
  User,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/" },
  { name: "Career Path", icon: Target, path: "/career-path" },
  { name: "Skill Gap", icon: GitCompare, path: "/skill-gap" },
  { name: "Roadmap", icon: Map, path: "/roadmap" },
  { name: "Resources", icon: BookOpen, path: "/resources" },
  { name: "Coding Tracker", icon: Code, path: "/coding-tracker" },
  { name: "Contest Tracker", icon: Trophy, path: "/contest-tracker" },
  { name: "Internships", icon: Briefcase, path: "/internships" },
  { name: "Internship Prep", icon: GraduationCap, path: "/internship-prep" },
  { name: "Mock Test", icon: FileText, path: "/mock-test" },
  { name: "Mock Interview", icon: MessageSquare, path: "/mock-interview" },
  { name: "Resume Analyzer", icon: FileCheck, path: "/resume-analyzer" },
  { name: "Job Matching", icon: Search, path: "/jobs" },
  { name: "Productivity", icon: Activity, path: "/productivity" },
  { name: "Fitness & Life", icon: Heart, path: "/fitness" },
  { name: "Analytics", icon: BarChart3, path: "/analytics" },
];

export function DashboardLayout() {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border flex flex-col shadow-sm">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4f46e5] to-[#8b5cf6] flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-semibold bg-gradient-to-r from-[#4f46e5] to-[#8b5cf6] bg-clip-text text-transparent">
              Smart Career
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <div className="space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                    isActive
                      ? "bg-[#4f46e5] text-white shadow-md"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-sm">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation Bar */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 shadow-sm">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold text-foreground">
              {navigation.find((item) => item.path === location.pathname)?.name || "Dashboard"}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="relative p-2 rounded-lg hover:bg-accent transition-colors">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#ef4444] rounded-full"></span>
            </button>

            {/* User Profile */}
            <button className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4f46e5] to-[#8b5cf6] flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium">Student Name</p>
                <p className="text-xs text-muted-foreground">Premium</p>
              </div>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
