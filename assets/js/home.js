// StoryVerse – Homepage Premium JS (v2)
// Handles: hero stars, categories, featured stories, counters, testimonials, scroll animations
"use strict";

/* ============================================================
   CATEGORY DATA
   ============================================================ */
const CATEGORY_INFOS = [
  { slug: "Fairy Tales",        icon: "wand-2",         color: "from-pink-400 to-rose-500",   count: 8  },
  { slug: "Bedtime Stories",    icon: "moon",           color: "from-indigo-400 to-violet-600", count: 7  },
  { slug: "Moral Stories",      icon: "heart",          color: "from-orange-400 to-red-500",   count: 9  },
  { slug: "Adventure Stories",  icon: "compass",        color: "from-amber-400 to-orange-500", count: 7  },
  { slug: "Animal Stories",     icon: "rabbit",         color: "from-green-400 to-teal-500",   count: 5  },
  { slug: "Friendship Stories", icon: "users",          color: "from-sky-400 to-blue-500",     count: 5  },
  { slug: "Magic Stories",      icon: "sparkles",       color: "from-purple-400 to-fuchsia-600",count: 4 },
  { slug: "Princess Stories",   icon: "crown",          color: "from-pink-300 to-purple-500",  count: 4  },
  { slug: "Space Stories",      icon: "rocket",         color: "from-slate-500 to-indigo-700", count: 4  },
  { slug: "Ocean Stories",      icon: "waves",          color: "from-cyan-400 to-blue-600",    count: 2  },
  { slug: "Science Stories",    icon: "flask-conical",  color: "from-emerald-400 to-teal-600", count: 3  },
  { slug: "Weather Stories",    icon: "cloud-lightning",color: "from-yellow-400 to-amber-600", count: 2  },
];

/* ============================================================
   RENDER CATEGORIES
   ============================================================ */
function renderCategories() {
  const container = document.getElementById("categories-container");
  if (!container) return;

  container.innerHTML = CATEGORY_INFOS.map((cat, i) => {
    const storyCount = typeof STORIES_DATA !== "undefined"
      ? STORIES_DATA.filter(s => s.category === cat.slug).length
      : cat.count;
    const art = typeof SVGGenerator !== "undefined"
      ? SVGGenerator.getIllustration(cat.slug, cat.slug)
      : "";

    return `
      <a href="stories.html?cat=${encodeURIComponent(cat.slug)}"
         class="cat-card h-reveal"
         data-reveal
         style="transition-delay:${(i % 4) * 0.08}s;"
         aria-label="${cat.slug}">
        <div class="cat-card-art">
          ${art}
        </div>
        <div class="cat-card-body">
          <div class="cat-card-icon bg-gradient-to-br ${cat.color}">
            <i data-lucide="${cat.icon}" class="w-4 h-4 text-white"></i>
          </div>
          <div class="cat-card-name">${cat.slug}</div>
          <div class="cat-card-count">${storyCount} ${storyCount === 1 ? "story" : "stories"}</div>
          <div class="cat-card-link">
            <span>Explore</span>
            <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
          </div>
        </div>
      </a>
    `;
  }).join("");

  if (typeof lucide !== "undefined") lucide.createIcons();
}

/* ============================================================
   RENDER FEATURED STORIES
   ============================================================ */
function renderFeaturedStories() {
  const container = document.getElementById("featured-stories-container");
  if (!container || typeof STORIES_DATA === "undefined") return;

  // Pick 3 stories — first 3 by highest rating
  const featured = [...STORIES_DATA]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  const badges = ["✨ Editor's Pick", "🔥 Trending", "❤️ Loved by Kids"];

  container.innerHTML = featured.map((s, i) => {
    const art = typeof SVGGenerator !== "undefined"
      ? SVGGenerator.getIllustration(s.title, s.category)
      : `<div style="background:linear-gradient(135deg,#6c63ff22,#06d6a022);width:100%;height:100%;"></div>`;

    const isFav = typeof StoryVerse !== "undefined" ? StoryVerse.isFavorite(s.id) : false;

    return `
      <article class="story-card-premium h-reveal" data-reveal style="transition-delay:${i * 0.12}s;">
        <div class="story-card-art">
          <div class="story-card-art-inner">${art}</div>
          <div class="story-badge-editors">${badges[i]}</div>
          <div class="story-badge-rating">⭐ ${s.rating}</div>
          <button
            class="story-fav-btn"
            id="home-fav-${s.id}"
            onclick="event.preventDefault(); toggleHomeFav(${s.id})"
            aria-label="${isFav ? "Remove from favorites" : "Add to favorites"}">
            <i data-lucide="heart" class="w-4 h-4 ${isFav ? "fill-current text-red-500" : ""}"></i>
          </button>
        </div>
        <div class="story-card-body">
          <div class="story-meta-row">
            <span>⏱️ ${s.readingTime} min</span>
            <span class="meta-orange">📖 Ages ${s.ageGroup}</span>
            <span style="color:#94a3b8;font-weight:500;">${s.category}</span>
          </div>
          <h3 class="story-card-title">${s.title}</h3>
          <p class="story-card-desc">${s.description}</p>
          <a href="read.html?id=${s.id}" class="btn-read-story">
            <i data-lucide="book-open" class="w-4 h-4"></i>
            <span>Read Story</span>
          </a>
        </div>
      </article>
    `;
  }).join("");

  if (typeof lucide !== "undefined") lucide.createIcons();
}

/* ============================================================
   TOGGLE FAVORITE FROM HOMEPAGE
   ============================================================ */
function toggleHomeFav(id) {
  if (typeof StoryVerse === "undefined") return;
  StoryVerse.toggleFavorite(id);
  const btn = document.getElementById(`home-fav-${id}`);
  if (!btn) return;
  const isFav = StoryVerse.isFavorite(id);
  const icon = btn.querySelector("i");
  if (icon) {
    icon.className = `w-4 h-4 ${isFav ? "fill-current text-red-500" : ""}`;
    icon.setAttribute("data-lucide", "heart");
    if (typeof lucide !== "undefined") lucide.createIcons();
  }
  btn.setAttribute("aria-label", isFav ? "Remove from favorites" : "Add to favorites");
}

/* ============================================================
   HERO STAR FIELD
   ============================================================ */
function initHeroStars() {
  const field = document.getElementById("hero-stars-field");
  if (!field) return;
  const count = window.innerWidth < 768 ? 50 : 90;
  for (let i = 0; i < count; i++) {
    const star = document.createElement("div");
    star.className = "star";
    const size = Math.random() * 2.5 + 0.5;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const dur = (Math.random() * 3 + 2).toFixed(1);
    const delay = (Math.random() * 4).toFixed(1);
    const minOp = (Math.random() * 0.2 + 0.1).toFixed(2);
    const maxOp = (Math.random() * 0.5 + 0.5).toFixed(2);
    Object.assign(star.style, {
      width: `${size}px`, height: `${size}px`,
      left: `${x}%`, top: `${y}%`,
      "--dur": `${dur}s`, "--delay": `${delay}s`,
      "--min-op": minOp, "--max-op": maxOp,
    });
    field.appendChild(star);
  }
}

/* ============================================================
   CTA FLOATING STARS
   ============================================================ */
function initCTAStars() {
  const field = document.getElementById("cta-stars-field");
  if (!field) return;
  for (let i = 0; i < 20; i++) {
    const star = document.createElement("div");
    star.className = "cta-star";
    const size = Math.random() * 3 + 2;
    Object.assign(star.style, {
      width: `${size}px`, height: `${size}px`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${(Math.random() * 3).toFixed(1)}s`,
      animationDuration: `${(Math.random() * 2 + 1.5).toFixed(1)}s`,
    });
    field.appendChild(star);
  }
}

/* ============================================================
   SCROLL-REVEAL (IntersectionObserver)
   ============================================================ */
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -60px 0px" });

  document.querySelectorAll(".h-reveal").forEach(el => observer.observe(el));
}

/* ============================================================
   ANIMATED COUNTERS
   ============================================================ */
function initCounters() {
  const statEls = document.querySelectorAll("[data-target]");
  if (!statEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.getAttribute("data-target"), 10);
      const suffix = el.getAttribute("data-suffix") || "";
      const fmt    = el.getAttribute("data-format") || "";
      const duration = 1800;
      const step = 16;
      const steps = duration / step;
      let current = 0;
      const increment = target / steps;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        let display;
        if (fmt === "k" && target >= 1000) {
          display = `${(current / 1000).toFixed(0)}K`;
        } else {
          display = Math.round(current);
        }
        el.textContent = `${display}${suffix}`;
      }, step);

      observer.unobserve(el);
    });
  }, { threshold: 0.6 });

  statEls.forEach(el => observer.observe(el));
}

/* ============================================================
   TESTIMONIAL SLIDER
   ============================================================ */
function initTestimonialSlider() {
  const track  = document.getElementById("testimonial-track");
  const dots   = document.querySelectorAll("#testimonial-dots button");
  if (!track || !dots.length) return;

  let current = 0;
  const total = dots.length;
  let autoTimer;

  function goTo(idx) {
    current = idx;
    track.style.transform = `translateX(-${idx * 100}%)`;
    dots.forEach((d, i) => {
      d.style.width    = i === idx ? "32px" : "8px";
      d.style.opacity  = i === idx ? "1" : "0.3";
    });
  }

  function advance() {
    goTo((current + 1) % total);
  }

  dots.forEach((d, i) => {
    d.addEventListener("click", () => {
      clearInterval(autoTimer);
      goTo(i);
      autoTimer = setInterval(advance, 6000);
    });
  });

  autoTimer = setInterval(advance, 6000);
}

/* ============================================================
   NAVBAR SCROLL BEHAVIOR
   ============================================================ */
function initScrollToTop() {
  const btn = document.getElementById("scroll-to-top");
  if (!btn) return;
  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      btn.classList.remove("opacity-0", "translate-y-10");
      btn.classList.add("opacity-100", "translate-y-0");
    } else {
      btn.classList.add("opacity-0", "translate-y-10");
      btn.classList.remove("opacity-100", "translate-y-0");
    }
  });
  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

/* ============================================================
   SMOOTH ANCHOR SCROLL
   ============================================================ */
function initAnchorScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", e => {
      const target = document.querySelector(a.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

/* ============================================================
   INIT ALL
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  // Generate dynamic content
  renderCategories();
  renderFeaturedStories();

  // Stars and particles
  initHeroStars();
  initCTAStars();

  // Interactions
  initScrollReveal();
  initCounters();
  initTestimonialSlider();
  initScrollToTop();
  initAnchorScroll();

  // Theme (also called by core.js, ensure icons re-drawn)
  StoryVerse.initTheme();

  // Lucide icons (final pass after all dynamic content)
  if (typeof lucide !== "undefined") lucide.createIcons();

  // GSAP stagger for hero elements (if available)
  if (typeof gsap !== "undefined") {
    gsap.fromTo(".hero-content > *",
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power2.out", delay: 0.2 }
    );
  }
});
