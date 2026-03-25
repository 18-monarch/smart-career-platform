const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8080/api";

// Generic safe fetch — must be defined before all callers
const safeFetch = async (url: string, options?: RequestInit) => {
  try {
    const res = await fetch(url, options);

    if (!res.ok) {
      if (res.status === 401) throw new Error("Invalid email or password");
      if (res.status === 400) throw new Error("Bad request. Please check your data.");
      const text = await res.text();
      throw new Error(text || `Error ${res.status}`);
    }

    return await res.json();
  } catch (err: any) {
    console.error("API ERROR:", err);
    throw err;
  }
};

export const getNotifications = async (userId: number) => {
  return safeFetch(`${BASE_URL}/notifications/${userId}`);
};

// ================= AUTH =================

export const loginUser = async (email: string, password: string) => {
  return safeFetch(`${BASE_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
};

export const createUser = async (user: any) => {
  return safeFetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
};

// ================= DASHBOARD =================

export const getDashboard = async (userId: number) => {
  return safeFetch(`${BASE_URL}/dashboard/${userId}`);
};

// CAREER
export const getCareers = () =>
  safeFetch(`${BASE_URL}/career`);

export const selectCareer = (career: string) =>
  safeFetch(`${BASE_URL}/career/select`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ career }),
  });

// SKILL GAP
export const getSkillGap = (userId: number) =>
  safeFetch(`${BASE_URL}/skills/${userId}`);

// ROADMAP
export const getRoadmap = (userId: number) =>
  safeFetch(`${BASE_URL}/roadmap/${userId}`);
  
export const toggleMilestone = (milestoneId: number) =>
  safeFetch(`${BASE_URL}/roadmap/milestone/${milestoneId}/toggle`, {
    method: "POST",
  });

// RESOURCES
export const getResources = (category?: string) =>
  safeFetch(`${BASE_URL}/resources${category && category !== "All" ? `?category=${category}` : ""}`);

// CODING TRACKER
export const getCodingActivity = (userId: number) =>
  safeFetch(`${BASE_URL}/coding/${userId}`);

// CONTEST TRACKER
export const getContestStats = (userId: number) =>
  safeFetch(`${BASE_URL}/contests/${userId}`);

// JOBS
export const getJobRecommendations = (userId: number) =>
  safeFetch(`${BASE_URL}/jobs/recommend?userId=${userId}`);

// PRODUCTIVITY
export const getProductivityStats = (userId: number) =>
  safeFetch(`${BASE_URL}/productivity/${userId}`);

// FITNESS
export const getFitnessStats = (userId: number) =>
  safeFetch(`${BASE_URL}/fitness/${userId}`);

// ANALYTICS
export const getAnalytics = (userId: number) =>
  safeFetch(`${BASE_URL}/analytics/${userId}`);

// MOCK TEST
export const getMockTest = () =>
  safeFetch(`${BASE_URL}/mock-test`);

// INTERNSHIP PREP
export const getInternshipPrep = () =>
  safeFetch(`${BASE_URL}/internship-prep`);

// MOCK INTERVIEW
export const getMockInterview = () =>
  safeFetch(`${BASE_URL}/mock-interview`);

// RESUME ANALYZER
export const getResumeAnalysis = () =>
  safeFetch(`${BASE_URL}/resume-analyzer`);