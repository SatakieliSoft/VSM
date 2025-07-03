// js/map.js

import { API_URL } from "./config.js";
import { getToken } from "./auth.js";

/**
 * Načíta všetky pamiatky (landmarks) z API
 * @returns {Promise<Array>} pole pamiatok
 */
export async function fetchLandmarks() {
  const token = getToken();

  const response = await fetch(`${API_URL}/landmarks/`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error("Nepodarilo sa načítať pamiatky.");
  }

  return await response.json();
}
