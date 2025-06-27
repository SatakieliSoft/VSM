// js/map.js
import { API_URL } from "./config.js";
import { getToken } from "./auth.js";

/**
 * Načíta všetky pamiatky (landmarks) z API
 * @returns {Promise<Array>} pole pamiatok
 */
export async function fetchLandmarks() {
  const response = await fetch(`${API_URL}/landmarks`, {
    headers: {
      "Authorization": `Bearer ${getToken()}`
    }
  });

  if (!response.ok) {
    throw new Error("Nepodarilo sa načítať pamiatky.");
  }

  return await response.json();
}

/**
 * Načíta všetky trasy z API
 * @returns {Promise<Array>} pole trás
 */
export async function fetchRoutes() {
  const response = await fetch(`${API_URL}/routes`, {
    headers: {
      "Authorization": `Bearer ${getToken()}`
    }
  });

  if (!response.ok) {
    throw new Error("Nepodarilo sa načítať trasy.");
  }

  return await response.json();
}
