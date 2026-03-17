const BASE_URL = import.meta.env.VITE_API_URL;

// Generic safe fetch
const safeFetch = async (url: string, options?: RequestInit) => {
  try {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error("API error");
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
};

// AUTH
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

// DASHBOARD
export const getDashboard = async (userId: number) => {
  return safeFetch(`${BASE_URL}/dashboard/${userId}`);
};

// NOTIFICATIONS (optional safe)
export const getNotifications = async (userId: number) => {
  return safeFetch(`${BASE_URL}/notifications/${userId}`);
};