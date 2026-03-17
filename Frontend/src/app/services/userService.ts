export const BASE_URL = "http://localhost:8080/api";
const API_URL = `${BASE_URL}/users`;

export async function getUsers() {

  const response = await fetch(API_URL);

  return response.json();
}

export async function createUser(user:any) {

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  });

  return response.json();
}