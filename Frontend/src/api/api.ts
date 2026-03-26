const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8080/api";

// ✅ SAFE FETCH WITH JWT
const safeFetch = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem("token");

  const headers: any = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(url, {
    ...options,
    headers,
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return res.json();
};

export const getNotifications = async () => {
  return safeFetch(`${BASE_URL}/notifications`);
};

// ================= AUTH =================

// 🔐 LOGIN
export const loginUser = async (email: string, password: string) => {
  return safeFetch(`${BASE_URL}/users/login`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
};

// 🔐 REGISTER
export const createUser = async (user: any) => {
  return safeFetch(`${BASE_URL}/users`, {
    method: "POST",
    body: JSON.stringify(user),
  });
};

// ================= DASHBOARD =================

export const getDashboard = async () => {
  return safeFetch(`${BASE_URL}/dashboard`);
};

// ================= CAREER =================

export const getCareers = () =>
  safeFetch(`${BASE_URL}/career`);

export const selectCareer = (career: string) =>
  safeFetch(`${BASE_URL}/career/select`, {
    method: "POST",
    body: JSON.stringify({ career }),
  });

// ================= SKILL GAP =================

export const getSkillGap = () =>
  safeFetch(`${BASE_URL}/skills`);

// ================= ROADMAP =================

export const getRoadmap = () =>
  safeFetch(`${BASE_URL}/roadmap`);

export const toggleMilestone = (milestoneId: number) =>
  safeFetch(`${BASE_URL}/roadmap/milestone/${milestoneId}/toggle`, {
    method: "POST",
  });

// ================= RESOURCES =================

export const getResources = (category?: string) =>
  safeFetch(
    `${BASE_URL}/resources${
      category && category !== "All" ? `?category=${category}` : ""
    }`
  );

// ================= CODING =================

export const getCodingActivity = () =>
  safeFetch(`${BASE_URL}/coding`);

// ================= CONTEST =================

export const getContestStats = () =>
  safeFetch(`${BASE_URL}/contests`);

// ================= JOBS =================

export const getJobRecommendations = () =>
  safeFetch(`${BASE_URL}/jobs/recommend`);

// ================= PRODUCTIVITY =================

export const getProductivityStats = () =>
  safeFetch(`${BASE_URL}/productivity`);

// ================= FITNESS =================

export const getFitnessStats = () =>
  safeFetch(`${BASE_URL}/fitness`);

// ================= ANALYTICS =================

export const getAnalytics = () =>
  safeFetch(`${BASE_URL}/analytics`);

// ================= MOCK =================

export const getMockTest = () =>
  safeFetch(`${BASE_URL}/mock-test`);

export const getInternshipPrep = () =>
  safeFetch(`${BASE_URL}/internship-prep`);

export const getMockInterview = () =>
  safeFetch(`${BASE_URL}/mock-interview`);

export const getResumeAnalysis = () =>
  safeFetch(`${BASE_URL}/resume-analyzer`);