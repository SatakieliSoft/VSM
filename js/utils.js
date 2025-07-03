/**
 * Zobrazí chybovú správu v zadanom elemente
 * @param {HTMLElement} element - Kam vložiť hlášku
 * @param {string} message - Zobrazovaný text
 */
export function showError(element, message) {
  element.textContent = message;
  element.style.color = "red";
  element.style.display = "block";
}

/**
 * Vymaže obsah a skryje hlášku
 * @param {HTMLElement} element 
 */
export function clearError(element) {
  element.textContent = "";
  element.style.display = "none";
}

/**
 * Zistí, či je používateľ prihlásený
 * @returns {boolean}
 */
export function isLoggedIn() {
  return !!localStorage.getItem("token");
}

/**
 * Odhlási používateľa a presmeruje na login
 */
export function logout() {
  localStorage.removeItem("token");
  window.location.href = "/pages/login.html";
}

/**
 * Získa token z localStorage
 * @returns {string|null}
 */
export function getToken() {
  return localStorage.getItem("token");
}
