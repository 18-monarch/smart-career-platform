import React, { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
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
  Menu,
  X,
  LogOut,
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const userName = localStorage.getItem("userName") || "User";

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen bg-neutral-50 overflow-hidden font-sans">
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-neutral-200 flex flex-col shadow-xl transition-transform duration-300 transform
        lg:translate-x-0 lg:static lg:inset-auto lg:shadow-none
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-neutral-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-200">
              <Target className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-neutral-900">
              Smart Career
            </span>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2 text-neutral-400 hover:text-neutral-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1 custom-scrollbar">
          {navigation.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100 font-medium"
                    : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? "text-white" : "text-neutral-400 group-hover:text-indigo-600"}`} />
                <span className="text-sm tracking-wide">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 shrink-0 bg-white border-b border-neutral-200 flex items-center justify-between px-4 sm:px-6 z-30 shadow-sm">
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleSidebar}
              className="p-2 -ml-2 text-neutral-500 hover:bg-neutral-100 rounded-lg lg:hidden"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-bold text-neutral-900 truncate">
              {navigation.find((item) => item.path === location.pathname)?.name || "Dashboard"}
            </h1>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            {/* Notifications */}
            <button className="relative p-2 rounded-xl text-neutral-500 hover:bg-neutral-100 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            {/* Profile */}
            <div className="h-8 w-px bg-neutral-200 hidden sm:block mx-1"></div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2.5 p-1 rounded-xl">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center overflow-hidden">
                  <User className="w-5 h-5 text-indigo-600" />
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-semibold text-neutral-900 leading-tight">{userName}</p>
                  <p className="text-[10px] uppercase tracking-wider font-bold text-indigo-600">Member</p>
                </div>
              </div>

              <button
                onClick={handleLogout}
                title="Logout"
                className="p-2 rounded-xl text-neutral-500 hover:bg-red-50 hover:text-red-600 transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto bg-neutral-50/50 p-4 sm:p-6 md:p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e5e5e5; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #d4d4d4; }
      `}} />

    </div>
  );
}
