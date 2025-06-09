const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");
const themeToggleIcon = document.getElementById("theme-toggle-icon");

// Show/hide mobile menu
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// Set icon based on theme

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

// Optional: Animate cards on scroll using IntersectionObserver
const cards = document.querySelectorAll(".testimonial-card");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.3,
  }
);

cards.forEach((card) => {
  observer.observe(card);
});

const chatDisplay = document.getElementById("chatDisplay");
const chatInput = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendBtn");
const sampleQuestions = document.querySelectorAll(".sample-question");

// 💬 Bio for Dreams Software
const systemMessage = `You are a helpful assistant for Dreams Software, a technology company based in Ethiopia. 
Dreams Software is founded by Elyas Yenealem and is focused on building modern websites, apps, and digital solutions 
for businesses and individuals. The company values innovation, reliability, and user-friendliness. 
Dreams Software helps clients build professional online platforms, manage content, and grow digitally. 
Contact: dreamssoftware.et@gmail.com | Phone: +251 973 545462.`;

const puter = puterAI.chat({
  model: "gpt-4",
  messages: [{ role: "system", content: systemMessage }],
  onMessage: (message) => {
    appendMessage(message.content, "bot");
  },
});

function appendMessage(content, role) {
  const bubble = document.createElement("div");
  bubble.classList.add("chat-bubble", role);
  bubble.textContent = content;
  chatDisplay.appendChild(bubble);
  chatDisplay.scrollTop = chatDisplay.scrollHeight;
}

function sendMessage() {
  const message = chatInput.value.trim();
  if (!message) {
    appendMessage("⚠️ Please enter a question before sending.", "bot");
    return;
  }

  appendMessage(message, "user");
  puter.send(message);
  chatInput.value = "";
}

sendBtn.addEventListener("click", sendMessage);
chatInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

sampleQuestions.forEach((btn) => {
  btn.addEventListener("click", () => {
    chatInput.value = btn.textContent;
    sendMessage();
  });
});
