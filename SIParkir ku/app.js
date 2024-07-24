function toggleMenu() {
  var navLinks = document.getElementById("navLinks");
  var hamIcon = document.getElementById("hamIcon");
  var closeIcon = document.getElementById("closeIcon");

  if (navLinks.classList.contains("active")) {
    navLinks.classList.remove("active");
    hamIcon.style.display = "block";
    closeIcon.style.display = "none";
  } else {
    navLinks.classList.add("active");
    hamIcon.style.display = "none";
    closeIcon.style.display = "block";
  }
}

const dashboardTitle = document.getElementById("dashboard-title");
const welcomeMessage = document.getElementById("welcome-message");
const currentModeElement = document.getElementById("current-mode");

function updateDashboardContent(mode) {
  dashboardTitle.innerText = "Monitoring";
  welcomeMessage.innerText = `Mode Kendali Saat Ini: ${mode}`;
  currentModeElement.innerText = ""; // Optionally clear or add more info if needed
}

document.addEventListener("DOMContentLoaded", function () {
  // Retrieve the username from localStorage
  const username = localStorage.getItem("username");
  if (username) {
    document.getElementById("operator").textContent = username;
  } else {
    // Redirect to login if username is not found
    window.location.href = "../login.html";
  }
});

function logout() {
  // Clear localStorage and redirect to login page
  localStorage.clear();
  window.location.href = "../login.html";
}

function logout() {
  // Logika untuk keluar (logout)
  alert("You have logged out.");
  window.location.href = "../public/Home/Home.html"; // Redirect ke halaman login
}

function updateTime() {
  const now = new Date();
  const timeElement = document.getElementById("time");
  const dateElement = document.getElementById("date");

  // Format the time as HH:MM:SS
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const timeString = `${hours}:${minutes}:${seconds}`;

  // Format the date as Day, Month Date, Year
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const dateString = now.toLocaleDateString(undefined, options);

  // Update the HTML elements
  timeElement.textContent = timeString;
  dateElement.textContent = dateString;
}

// Update the time and date every second
setInterval(updateTime, 1000);

// Initial call to display the time and date immediately
updateTime();
