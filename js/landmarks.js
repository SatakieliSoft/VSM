import { fetchLandmarks } from "./map.js";
import { showError, clearError } from "./utils.js";

const listEl = document.getElementById("landmark-list");
const errorEl = document.getElementById("error-message");

const map = L.map("map").setView([48.7, 19.5], 7);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '© OpenStreetMap prispievatelia'
}).addTo(map);

const markers = [];

function toggleLandmark(landmark, checked) {
  if (checked) {
    const marker = L.marker([landmark.latitude, landmark.longitude])
      .bindPopup(`<strong>${landmark.name}</strong><br>${landmark.description || ""}`)
      .addTo(map);
    marker._landmarkId = landmark.id;
    markers.push(marker);
  } else {
    const marker = markers.find(m => m._landmarkId === landmark.id);
    if (marker) {
      map.removeLayer(marker);
      const index = markers.indexOf(marker);
      markers.splice(index, 1);
    }
  }

  // 🗺 Zväčšenie výrezu na všetky zobrazené pamiatky
  if (markers.length) {
    const group = L.featureGroup(markers);
    map.fitBounds(group.getBounds().pad(0.2));
  }
}

async function loadLandmarks() {
  clearError(errorEl);
  try {
    const landmarks = await fetchLandmarks();

    landmarks.forEach(landmark => {
      const li = document.createElement("li");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = `landmark-${landmark.id}`;
      checkbox.addEventListener("change", e => {
        toggleLandmark(landmark, e.target.checked);
      });

      const label = document.createElement("label");
      label.setAttribute("for", checkbox.id);
      label.innerText = `${landmark.name} (${landmark.typ})`;

      li.appendChild(checkbox);
      li.appendChild(label);
      listEl.appendChild(li);
    });
  } catch (err) {
    console.error("❌ Chyba pri načítaní:", err);
    showError(errorEl, err.message);
  }
}

loadLandmarks();
