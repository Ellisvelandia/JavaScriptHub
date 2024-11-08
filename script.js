let currentLanguage = localStorage.getItem("language") || "en";

function toggleLanguage() {
  const body = document.body;
  const isSpanish = body.classList.contains("spanish");

  if (isSpanish) {
    body.classList.remove("spanish");
    localStorage.setItem("language", "en");
    updateContent("en");
  } else {
    body.classList.add("spanish");
    localStorage.setItem("language", "es");
    updateContent("es");
  }
}

function updateContent(lang) {
  currentLanguage = lang || localStorage.getItem("language") || "en";

  document.querySelectorAll("[data-translate]").forEach((element) => {
    const key = element.getAttribute("data-translate");
    if (translations[currentLanguage] && translations[currentLanguage][key]) {
      element.textContent = translations[currentLanguage][key];
    } else {
      console.warn(
        `Translation missing for key: ${key} in language: ${currentLanguage}`
      );
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const savedLanguage = localStorage.getItem("language") || "en";
  if (savedLanguage === "es") {
    document.body.classList.add("spanish");
  }
  updateContent(savedLanguage);

  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });
});

function checkTranslations() {
  const elements = document.querySelectorAll("[data-translate]");
  elements.forEach((element) => {
    const key = element.getAttribute("data-translate");
    if (!translations[currentLanguage][key]) {
      console.warn(`Missing translation for key: ${key} in ${currentLanguage}`);
    }
  });
}

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Add fade-in animation to elements
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".concept-card, h1, h2");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  elements.forEach((element) => {
    observer.observe(element);
  });
});
