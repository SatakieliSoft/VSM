// js/auth.js
import { API_URL } from "./config.js";

/**
 * Prihlási používateľa pomocou emailu a hesla.
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<object>} data s tokenom
 */
export async function loginUser(email, password) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  if (!response.ok) {
    throw new Error("Neúspešné prihlásenie");
  }

  const data = await response.json();
  localStorage.setItem("token", data.access_token);
  return data;
}

/**
 * Získa uložený token z localStorage
 * @returns {string|null}
 */
export function getToken() {
  return localStorage.getItem("token");
}
