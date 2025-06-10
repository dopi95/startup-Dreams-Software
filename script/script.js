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
You are an assistant working for Dreams Software — a passionate Ethiopian tech startup founded by Elyas Yenealem. The company was born from the realization that many local schools, hospitals, and companies still rely on manual systems. Elyas, a student and developer, brought together classmates who believed in solving community problems through technology. The core team includes Elyas Yenealem (Founder & Full Stack Developer), Dagim Sisay (UI/UX Designer), Bereket Eshete, and Tenbite Daniel.

Mission: To empower Ethiopian businesses and institutions by building modern, accessible, and affordable software solutions across all platforms.

Vision: We envision a future where every local business, school, and startup in Ethiopia can launch and grow with the help of scalable digital tools — no matter the device or platform.

Startup Goals:
- Develop 10+ fully functional cross-platform mobile apps.
- Partner with more local companies/startups to digitize services.
- Hire and train junior developers to scale the team.
Who Can Join:
- Local entrepreneurs and startup founders.
- Government IT and innovation departments.
- Educational institutions and NGOs.

🛠 Products & Services:
1. Website Development – Responsive, SEO-friendly websites for businesses, schools, and professionals.
2. Mobile App Development – Reliable, user-friendly mobile apps that solve local problems.
3. Custom Software Solutions – Tailored desktop/web applications based on specific client needs.
 Key Features:
- Responsive Design (HTML, CSS, JavaScript): Ensures websites work beautifully across all devices.
- Offline Access (Flutter, React Native + local DB): Saves clients money and time by enabling multi-platform functionality with offline support.

Testimonials:
- “Dreams Software created a full mobile and web app for our school in under 3 weeks — now parents and teachers stay connected.” – Yonas Nibret, Co-Founder, Blue Light Academy
- “Thanks to Dreams Software, our real estate listing now reaches both local and diaspora clients with one powerful app.” – Mulugeta Damtew, Marketing Manager, Ghion Homes

Team:
- Elyas Yenealem – Founder & Lead Developer (Full Stack, System Design, Technical Lead)
- Dagim Sisay – UI/UX Designer (Mobile-first interfaces, Smooth UX)
- Bereket Eshete – Team Member
- Tenbite Daniel – Team Member

Please answer questions clearly, concisely, and in a friendly tone as Dreams Software's virtual assistant.
`,
  },
];

// Function to add messages to chat window
function addMessage(text, isUser) {
  const messagesDiv = document.getElementById("messages");
  const messageElem = document.createElement("div");
  messageElem.textContent = text;
  messageElem.style.padding = "8px 12px";
  messageElem.style.margin = "6px 0";
  messageElem.style.borderRadius = "12px";
  messageElem.style.maxWidth = "75%";
  messageElem.style.wordWrap = "break-word";
  messageElem.style.whiteSpace = "pre-wrap";

  if (isUser) {
    messageElem.style.backgroundColor = "#007bff";
    messageElem.style.color = "white";
    messageElem.style.alignSelf = "flex-end";
  } else {
    messageElem.style.backgroundColor = "#e1e1e1";
    messageElem.style.color = "#333";
    messageElem.style.alignSelf = "flex-start";
  }

  messagesDiv.appendChild(messageElem);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function sendMessage() {
  const input = document.getElementById("input-message");
  const message = input.value.trim();
  if (!message) return;

  addMessage(message, true); // Show user message
  input.value = ""; // Clear input

  messages.push({ content: message, role: "user" }); // Add to chat history

  if (typeof puter !== "undefined" && puter.ai) {
    puter.ai
      .chat(messages)
      .then((response) => {
        const reply =
          response?.message?.content?.trim() || "⚠️ No response from AI.";
        addMessage(reply, false); // Show AI reply
        messages.push({ content: reply, role: "assistant" });
      })
      .catch((error) => {
        console.error("AI response error:", error);
        addMessage("⚠️ Error talking to AI.", false);
      });
  } else {
    addMessage("⚠️ Puter SDK not loaded or unavailable.", false);
  }
}
