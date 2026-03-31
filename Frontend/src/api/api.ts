const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8080/api";

// ✅ SAFE FETCH WITH JWT
const safeFetch = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem("token");

  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string> || {}),
  };

  // Only add JSON content-type when body is NOT FormData
  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(url, {
      ...options,
      headers,
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`API Error [${res.status}] ${url}:`, errorText);
      throw new Error(errorText || `Request failed with status ${res.status}`);
    }

    return res.json();
  } catch (err: any) {
    console.error(`Fetch error for ${url}:`, err);
    throw err;
  }
};

export const getNotifications = async () => {
  return safeFetch(`${BASE_URL}/notifications`);
};

// ================= AUTH =================

export const loginUser = async (email: string, password: string) => {
  return safeFetch(`${BASE_URL}/users/login`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
};

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

export const fetchExternalCodingStats = (
  leetcodeUsername: string,
  codeforcesHandle: string
) =>
  safeFetch(`${BASE_URL}/coding-tracker`, {
    method: "POST",
    body: JSON.stringify({ leetcodeUsername, codeforcesHandle }),
  });

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

// ================= RESUME ANALYZER =================

export const getResumeAnalysis = () =>
  safeFetch(`${BASE_URL}/resume-analysis`);

export const uploadResumeForAnalysis = (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  return safeFetch(`${BASE_URL}/resume-analysis/upload`, {
    method: "POST",
    body: formData,
  });
};