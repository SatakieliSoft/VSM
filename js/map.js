import { API_URL } from "./config.js";
import { getToken } from "./auth.js";

/**
 * Načíta všetky pamiatky (landmarks) z API
 * @returns {Promise<Array>} pole pamiatok
 */
export async function fetchLandmarks() {
  const token = getToken();
  console.log("🔐 Token pre landmarks:", token);

  const response = await fetch(`${API_URL}/landmarks`, {
    headers: {
      "Authorization": `Bearer ${token}`
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
  const token = getToken();
  console.log("🔐 Token pre routes:", token);

  const response = await fetch(`${API_URL}/routes`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  if (!response.ok) {
    console.error("❌ Chyba z backendu:", response.status, response.statusText);
    throw new Error("Nepodarilo sa načítať trasy.");
  }

  const data = await response.json();
  console.log("📦 Načítané trasy:", data);
  return data;
}
