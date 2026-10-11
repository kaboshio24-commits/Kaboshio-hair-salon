// IMPORTANT: Replace SALON_WHATSAPP with the salon's WhatsApp number in international format.
const +2347083533968 = "2347083533968"; // Example format for Nigeria: 2348012345678 (no + or spaces)

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  menuToggle.textContent = isOpen ? "×" : "☰";
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.textContent = "☰";
}));

document.getElementById("year").textContent = new Date().getFullYear();

// Prevent selecting a date in the past.
const dateInput = document.getElementById("appointmentDate");
const today = new Date();
const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().split("T")[0];
dateInput.min = localToday;

document.querySelectorAll("[data-service]").forEach(link => {
  link.addEventListener("click", () => {
    document.getElementById("service").value = link.dataset.service;
  });
});

function openWhatsApp(message) {
  const url = `https://wa.me/${SALON_WHATSAPP}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

document.getElementById("bookingForm").addEventListener("submit", event => {
  event.preventDefault();
  if (SALON_WHATSAPP === "2347083533968") {
    alert("Before using bookings, open script.js and the configured KABOSHIO WhatsApp number is 07083533968.");
    return;
  }
  const form = new FormData(event.currentTarget);
  const message = [
    "Hello KABOSHIO! I'd like to request an appointment.",
    "",
    `Name: ${form.get("name")}`,
    `Phone: ${form.get("phone")}`,
    `Service: ${form.get("service")}`,
    `Preferred date: ${form.get("date")}`,
    `Preferred time: ${form.get("time")}`,
    `Style notes: ${form.get("notes") || "None"}`,
    "",
    "Please confirm availability and the final price. Thank you!"
  ].join("\n");
  openWhatsApp(message);
});

document.getElementById("whatsappLink").addEventListener("click", event => {
  event.preventDefault();
  if (SALON_WHATSAPP === "2347083533968") {
    alert("Before using WhatsApp chat, open script.js and the configured KABOSHIO WhatsApp number is 07083533968.");
    return;
  }
  openWhatsApp("Hello KABOSHIO! I'd like to ask about your services and prices.");
});
