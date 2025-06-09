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

let currentIndex = 0;

function scrollCarousel(direction) {
  const carousel = document.getElementById("carousel");
  const cards = carousel.querySelectorAll(".card");
  const cardWidth = cards[0].offsetWidth + 16; // 16px margin

  currentIndex += direction;

  if (currentIndex < 0) currentIndex = 0;
  if (currentIndex >= cards.length) currentIndex = cards.length - 1;

  carousel.scrollTo({
    left: currentIndex * cardWidth,
    behavior: "smooth",
  });
}

const questions = document.querySelectorAll(".faq-question");

questions.forEach((q) => {
  q.addEventListener("click", () => {
    const openQuestion = document.querySelector(".faq-question.active");
    const openAnswer = document.querySelector(
      '.faq-answer[style*="max-height"]'
    );

    // Close previously opened answer
    if (openAnswer && openAnswer !== q.nextElementSibling) {
      openAnswer.style.maxHeight = null;
      openQuestion?.classList.remove("active");
    }

    const answer = q.nextElementSibling;
    const isOpen = answer.style.maxHeight;

    // Toggle current answer
    if (isOpen) {
      answer.style.maxHeight = null;
      q.classList.remove("active");
    } else {
      answer.style.maxHeight = answer.scrollHeight + "px";
      q.classList.add("active");
    }
  });
});

const form = document.getElementById("contactForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !email || !message) {
    alert("Please fill in all fields.");
    return;
  }

  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  alert("Thanks for reaching out, " + name + "! We'll get back to you soon.");
  form.reset();
});

let count = localStorage.getItem("visitCount");
count = count ? parseInt(count) + 1 : 1;
localStorage.setItem("visitCount", count);
document.getElementById("visit-count").textContent = `Site Visits: ${count}`;
