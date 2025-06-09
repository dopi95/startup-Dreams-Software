const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");
const themeToggleIcon = document.getElementById("theme-toggle-icon");
const themeIcon = document.getElementById("theme-icon");

// Show/hide mobile menu
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// Set icon based on theme
function updateThemeIcon(theme) {
  if (theme === "dark") {
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
  } else {
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");
  }
}

// Apply saved theme on load
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "light";
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  }
  updateThemeIcon(savedTheme);
});

// Toggle theme and update icon/localStorage
themeToggleIcon.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  updateThemeIcon(isDark ? "dark" : "light");
});

function showContent(section) {
  const sections = ["origin", "mission", "impact"];
  sections.forEach((id) => {
    document.getElementById(id).style.display =
      id === section ? "block" : "none";
    document
      .getElementById(id + "Btn")
      .classList.toggle("active", id === section);
  });
}
