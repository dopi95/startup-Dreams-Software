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

const messages = [
  {
    role: "system",
    content: `
You are a friendly and helpful chatbot for AddisWay, a web startup that helps people in Addis Ababa find taxi routes, check fare prices, and locate transfer points.

Greet users nicely. You can answer these common questions:
- Who founded AddisWay (Tenbite Daniel and his friends)
- What problems it solves (finding taxi routes, avoiding overpaying, knowing where to transfer)
- What services it offers (Route Finder, Fare Checker, Taxi Stop Locator)
- How someone can support or contact the team (via the contact section or social media)
- The startup’s vision (to make transportation fair, easy, and stress-free in Addis Ababa)

If users ask something off-topic, kindly tell them: “I'm here to help with anything about AddisWay.”

Always use short, simple sentences and speak like you're helping a local user. Be friendly, calm, and respectful.
`,
  },
];

// function to add message
function addMessage(msg, isUser) {
  const messagesDiv = document.getElementById("messages");
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message");
  if (isUser) {
    messageDiv.classList.add("user-message");
  }
  messageDiv.textContent = msg;
  messagesDiv.appendChild(messageDiv);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// function to send message
function sendMessage() {
  const input = document.getElementById("input-message");
  const message = input.value.trim();
  if (message) {
    addMessage(message, true);
    input.value = "";
    messages.push({ content: message, role: "user" });

    if (typeof puter !== "undefined") {
      puter.ai
        .chat(messages)
        .then((response) => {
          const reply = response.message?.content || "⚠️ No response from AI.";
          addMessage(reply, false);
          messages.push({ content: reply, role: "assistant" });
        })
        .catch((error) => {
          console.error("AI response error:", error);
          addMessage("⚠️ Error talking to AI.", false);
        });
    } else {
      addMessage("⚠️ Puter SDK not loaded.", false);
    }
  }
}
