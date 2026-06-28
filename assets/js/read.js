// StoryVerse – Reading Workspace (Polish v2)
"use strict";

const readJS = (() => {
  let story = null;
  let currentRating = 0;
  let synth = window.speechSynthesis || null;
  let utterance = null;
  let isSpeaking = false;
  let isPaused = false;
  let currentFontSize = "base";

  /* ========== INIT ========== */
  function init() {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get("id"), 10);

    if (!id) { window.location.href = "stories.html"; return; }

    story = STORIES_DATA.find(s => s.id === id);
    if (!story) { window.location.href = "stories.html"; return; }

    // Populate page
    populatePage();
    setupPagination(id);
    renderRelated();
    renderReviews();
    initStarRatingForm();
    initReviewForm();
    initProgressBar();
    initScrollToTop();
    initTTSSpeedLabel();
    StoryVerse.initTheme();
    lucide.createIcons();
  }

  /* ========== POPULATE ========== */
  function populatePage() {
    document.title = `${story.title} – StoryVerse`;
    const metaEl = document.getElementById("page-title");
    if (metaEl) metaEl.textContent = `${story.title} – StoryVerse`;

    setEl("breadcrumb-title", story.title);
    setEl("story-title", story.title);
    setEl("story-author", story.author);
    setEl("story-read-time", `${story.readingTime} min read`);
    setEl("story-rating", story.rating);

    const catBadge = document.getElementById("story-category-badge");
    if (catBadge) catBadge.textContent = story.category;

    const ageBadge = document.getElementById("story-age-badge");
    if (ageBadge) ageBadge.textContent = `Ages ${story.ageGroup}`;

    // Cover art
    const coverEl = document.getElementById("story-cover-art");
    if (coverEl) {
      coverEl.innerHTML = SVGGenerator.getIllustration(story.title, story.category);
    }

    // Story text content
    const contentEl = document.getElementById("story-content");
    if (contentEl) {
      contentEl.innerHTML = (story.content || "")
        .split(/\n{2,}/).map(p => `<p>${p.trim()}</p>`).join("");
    }

    // Moral box
    if (story.moral) {
      const moralBox = document.getElementById("moral-box");
      const moralText = document.getElementById("story-moral");
      if (moralBox) moralBox.classList.remove("hidden");
      if (moralText) moralText.textContent = story.moral;
    }

    // Tags / themes
    const tagsEl = document.getElementById("story-tags");
    if (tagsEl && story.tags && story.tags.length) {
      tagsEl.innerHTML = story.tags.map(t =>
        `<span class="px-3 py-1 rounded-full bg-purple/8 dark:bg-purple/15 text-purple dark:text-purple-light font-ui font-bold text-xs border border-purple/10">${t}</span>`
      ).join("");
    }

    // Like / Bookmark state
    updateLikeUI();
    updateBookmarkUI();
  }

  function setEl(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  /* ========== READING PROGRESS ========== */
  function initProgressBar() {
    const bar = document.getElementById("reading-progress");
    const localBar = document.getElementById("story-progress-bar");
    const pctEl = document.getElementById("progress-pct");

    window.addEventListener("scroll", () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total <= 0) return;
      const pct = Math.min((window.scrollY / total) * 100, 100);
      if (bar) bar.style.width = `${pct}%`;
      if (localBar) localBar.style.width = `${pct}%`;
      if (pctEl) pctEl.textContent = `${Math.round(pct)}%`;

      // Navbar shrink
      const nav = document.getElementById("main-navbar");
      if (nav) {
        if (window.scrollY > 40) nav.classList.add("navbar-scrolled");
        else nav.classList.remove("navbar-scrolled");
      }
    });
  }

  /* ========== FONT SIZE ========== */
  function setFontSize(size) {
    currentFontSize = size;
    const contentWrap = document.querySelector(".text-size-base, .text-size-sm, .text-size-lg, .text-size-xl");
    const article = document.querySelector("article");
    if (!article) return;
    article.classList.remove("text-size-sm", "text-size-base", "text-size-lg", "text-size-xl");
    article.classList.add(`text-size-${size}`);

    document.querySelectorAll(".font-size-btn").forEach(btn => {
      const isActive = btn.getAttribute("data-size") === size;
      btn.className = isActive
        ? "font-size-btn flex-1 py-2.5 rounded-xl font-bold font-ui text-xs border border-purple bg-purple text-white transition-all"
        : "font-size-btn flex-1 py-2.5 rounded-xl border border-purple/20 font-bold font-ui text-xs hover:bg-purple hover:text-white hover:border-purple transition-all";
      if (!isActive) btn.style.fontSize = "";
    });
  }

  /* ========== TTS ========== */
  function initTTSSpeedLabel() {
    const speedInput = document.getElementById("tts-speed");
    const speedLabel = document.getElementById("tts-speed-label");
    if (!speedInput || !speedLabel) return;

    speedInput.addEventListener("input", () => {
      const v = parseFloat(speedInput.value);
      speedLabel.textContent = v === 1 ? "Normal" : v < 1 ? "Slow" : "Fast";
      if (isSpeaking && utterance) {
        stopTTS();
        setTimeout(() => toggleTTS(), 100);
      }
    });
  }

  function toggleTTS() {
    if (!synth) {
      StoryVerse.showToast("Text-to-Speech is not supported in your browser.", "error");
      return;
    }

    const btn = document.getElementById("tts-toggle-btn");
    const stopBtn = document.getElementById("tts-stop-btn");
    const speedInput = document.getElementById("tts-speed");

    if (isSpeaking && !isPaused) {
      synth.pause();
      isPaused = true;
      if (btn) btn.innerHTML = `<i data-lucide="play" class="w-4 h-4"></i><span>Resume</span>`;
      if (btn) btn.className = "flex-1 py-2.5 px-4 rounded-xl btn-yellow flex items-center justify-center gap-2 font-ui font-bold text-xs";
    } else if (isSpeaking && isPaused) {
      synth.resume();
      isPaused = false;
      if (btn) btn.innerHTML = `<i data-lucide="pause-circle" class="w-4 h-4"></i><span>Pause</span>`;
      if (btn) btn.className = "flex-1 py-2.5 px-4 rounded-xl btn-mint flex items-center justify-center gap-2 font-ui font-bold text-xs";
    } else {
      // Start fresh
      const tmp = document.createElement("div");
      tmp.innerHTML = story.content || "";
      const rawText = tmp.textContent || tmp.innerText || "";
      utterance = new SpeechSynthesisUtterance(rawText);
      utterance.rate = parseFloat(speedInput?.value || "1");

      const voices = synth.getVoices();
      const preferred = voices.find(v =>
        v.name.includes("Zira") || v.name.includes("Google US English") || v.lang.startsWith("en")
      );
      if (preferred) utterance.voice = preferred;

      utterance.onend = () => { isSpeaking = false; isPaused = false; resetTTSBtn(); };
      utterance.onerror = () => { isSpeaking = false; isPaused = false; resetTTSBtn(); };

      synth.speak(utterance);
      isSpeaking = true;
      isPaused = false;

      if (btn) btn.innerHTML = `<i data-lucide="pause-circle" class="w-4 h-4"></i><span>Pause</span>`;
      if (btn) btn.className = "flex-1 py-2.5 px-4 rounded-xl btn-mint flex items-center justify-center gap-2 font-ui font-bold text-xs";
      if (stopBtn) stopBtn.classList.remove("hidden");
    }
    lucide.createIcons();
  }

  function stopTTS() {
    if (synth) synth.cancel();
    isSpeaking = false;
    isPaused = false;
    resetTTSBtn();
    const stopBtn = document.getElementById("tts-stop-btn");
    if (stopBtn) stopBtn.classList.add("hidden");
  }

  function resetTTSBtn() {
    const btn = document.getElementById("tts-toggle-btn");
    if (btn) {
      btn.innerHTML = `<i data-lucide="play-circle" class="w-4 h-4"></i><span>Listen</span>`;
      btn.className = "flex-1 py-2.5 px-4 rounded-xl btn-mint flex items-center justify-center gap-2 font-ui font-bold text-xs";
    }
    lucide.createIcons();
  }

  /* ========== LIKE / BOOKMARK / SHARE ========== */
  function toggleLike() {
    if (!story) return;
    StoryVerse.toggleLike(story.id);
    updateLikeUI();
  }

  function toggleBookmark() {
    if (!story) return;
    StoryVerse.toggleBookmark(story.id);
    updateBookmarkUI();
  }

  function shareStory() {
    if (!story) return;
    const url = `${window.location.origin}${window.location.pathname}?id=${story.id}`;
    if (navigator.share) {
      navigator.share({ title: story.title, text: story.description, url });
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => StoryVerse.showToast("Story link copied to clipboard! 🔗"));
    } else {
      StoryVerse.showToast("Story link: " + url);
    }
  }

  function updateLikeUI() {
    const btn = document.getElementById("like-btn");
    if (!btn || !story) return;
    const liked = StoryVerse.isLiked(story.id);
    const icon = btn.querySelector("i");
    const label = btn.querySelector("span");
    if (liked) {
      if (icon) icon.classList.add("fill-current");
      if (label) label.textContent = "Liked! ❤️";
      btn.classList.add("bg-pink-100", "border-pink-400");
    } else {
      if (icon) icon.classList.remove("fill-current");
      if (label) label.textContent = "Like Story";
      btn.classList.remove("bg-pink-100", "border-pink-400");
    }
  }

  function updateBookmarkUI() {
    const btn = document.getElementById("bookmark-btn");
    if (!btn || !story) return;
    const bookmarked = StoryVerse.isBookmarked(story.id);
    const icon = btn.querySelector("i");
    const label = btn.querySelector("span");
    if (bookmarked) {
      if (icon) icon.classList.add("fill-current");
      if (label) label.textContent = "Bookmarked! 🔖";
      btn.classList.add("bg-purple/15", "border-purple/40");
    } else {
      if (icon) icon.classList.remove("fill-current");
      if (label) label.textContent = "Bookmark";
      btn.classList.remove("bg-purple/15", "border-purple/40");
    }
  }

  /* ========== PAGINATION ========== */
  function setupPagination(id) {
    const idx = STORIES_DATA.findIndex(s => s.id === id);
    const prevLink = document.getElementById("prev-story-link");
    const nextLink = document.getElementById("next-story-link");
    const prevTitle = document.getElementById("prev-story-title");
    const nextTitle = document.getElementById("next-story-title");

    if (idx > 0) {
      const prev = STORIES_DATA[idx - 1];
      if (prevLink) prevLink.href = `read.html?id=${prev.id}`;
      if (prevTitle) prevTitle.textContent = prev.title;
    } else {
      if (prevLink) prevLink.classList.add("opacity-30", "pointer-events-none");
    }

    if (idx < STORIES_DATA.length - 1) {
      const next = STORIES_DATA[idx + 1];
      if (nextLink) nextLink.href = `read.html?id=${next.id}`;
      if (nextTitle) nextTitle.textContent = next.title;
    } else {
      if (nextLink) nextLink.classList.add("opacity-30", "pointer-events-none");
    }
  }

  /* ========== RELATED STORIES ========== */
  function renderRelated() {
    const grid = document.getElementById("related-stories-grid");
    if (!grid || !story) return;

    let related = STORIES_DATA.filter(s => s.category === story.category && s.id !== story.id);
    if (related.length < 3) {
      const others = STORIES_DATA.filter(s => s.id !== story.id && !related.includes(s));
      related = [...related, ...others.sort(() => Math.random() - 0.5)].slice(0, 3);
    } else {
      related = related.slice(0, 3);
    }

    grid.innerHTML = related.map(s => `
      <a href="read.html?id=${s.id}" class="glass-card flex flex-col rounded-2xl overflow-hidden hover:border-purple/30 transition-all group">
        <div class="w-full aspect-[4/3] overflow-hidden">
          ${SVGGenerator.getIllustration(s.title, s.category)}
        </div>
        <div class="p-4 flex-1">
          <span class="text-[9px] font-extrabold text-purple font-ui uppercase tracking-wider">${s.category}</span>
          <h4 class="font-heading text-base font-bold text-slate-800 dark:text-white leading-tight mt-1 mb-2 line-clamp-2 group-hover:text-purple transition-colors">${s.title}</h4>
          <div class="flex items-center gap-3 text-[10px] font-bold text-gray-400 font-ui">
            <span>⏱️ ${s.readingTime} min</span>
            <span>⭐ ${s.rating}</span>
          </div>
        </div>
      </a>
    `).join("");
  }

  /* ========== REVIEWS ========== */
  function getStorageKey() { return `sv_reviews_${story.id}`; }

  function getReviews() {
    const stored = localStorage.getItem(getStorageKey());
    if (stored) return JSON.parse(stored);
    // Sample reviews for first few stories
    if (story.id <= 3) {
      return [
        { author: "Happy Parent", rating: 5, text: "My child loved this! Read it three nights in a row. Wonderful moral and beautiful illustrations.", date: "Jun 26, 2026" },
        { author: "Emma, Age 8", rating: 5, text: "This is my favourite story! I love the characters so much 🌟", date: "Jun 24, 2026" }
      ];
    }
    return [];
  }

  function renderReviews() {
    const list = document.getElementById("reviews-list");
    if (!list || !story) return;
    const reviews = getReviews();

    if (reviews.length === 0) {
      list.innerHTML = `
        <div class="text-center py-10 glass-card rounded-2xl border border-white/20">
          <div class="text-4xl mb-3">✨</div>
          <p class="text-sm italic text-gray-400 dark:text-slate-500 font-ui">No reviews yet — be the first!</p>
        </div>`;
      return;
    }

    list.innerHTML = reviews.map(r => {
      const stars = Array.from({ length: 5 }, (_, i) =>
        `<span class="text-lg ${i < r.rating ? "text-yellow" : "text-gray-200 dark:text-slate-700"}">★</span>`
      ).join("");
      return `
        <div class="glass-card p-5 rounded-2xl border border-white/20">
          <div class="flex items-start justify-between gap-3 mb-3">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-full bg-gradient-to-br from-purple/40 to-mint/30 flex items-center justify-center font-extrabold text-sm text-white font-ui flex-shrink-0">
                ${r.author.charAt(0).toUpperCase()}
              </div>
              <div>
                <h5 class="font-bold text-sm text-slate-800 dark:text-white font-ui leading-none mb-0.5">${r.author}</h5>
                <span class="text-[10px] text-gray-400 dark:text-slate-500 font-ui">${r.date}</span>
              </div>
            </div>
            <div class="flex gap-0 flex-shrink-0">${stars}</div>
          </div>
          <p class="text-sm text-gray-600 dark:text-slate-300 font-body leading-relaxed">${r.text}</p>
        </div>
      `;
    }).join("");
  }

  /* ========== REVIEW FORM ========== */
  function initStarRatingForm() {
    const starBtns = document.querySelectorAll("#star-rating .star-btn");
    const ratingVal = document.getElementById("rating-val");

    starBtns.forEach(btn => {
      btn.addEventListener("mouseover", () => {
        const v = parseInt(btn.getAttribute("data-val"), 10);
        highlightStars(v, starBtns);
      });
      btn.addEventListener("mouseout", () => highlightStars(currentRating, starBtns));
      btn.addEventListener("click", () => {
        currentRating = parseInt(btn.getAttribute("data-val"), 10);
        if (ratingVal) ratingVal.textContent = `${currentRating}/5`;
        highlightStars(currentRating, starBtns);
      });
    });
  }

  function highlightStars(count, btns) {
    btns.forEach((btn, i) => {
      btn.textContent = i < count ? "★" : "☆";
      btn.className = `star-btn text-2xl transition-colors ${i < count ? "text-yellow dark:text-yellow-dark" : "text-gray-300 dark:text-slate-600"} hover:text-yellow`;
    });
  }

  function initReviewForm() {
    const form = document.getElementById("review-form");
    if (!form) return;
    form.addEventListener("submit", e => {
      e.preventDefault();
      const name = document.getElementById("reviewer-name")?.value.trim();
      const text = document.getElementById("review-text")?.value.trim();

      if (!name || !text) { StoryVerse.showToast("Please fill in your name and review.", "error"); return; }
      if (text.length < 10) { StoryVerse.showToast("Review must be at least 10 characters.", "error"); return; }
      if (currentRating === 0) { StoryVerse.showToast("Please select a star rating.", "error"); return; }

      const review = {
        author: name, rating: currentRating, text,
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
      };

      const reviews = getReviews();
      reviews.unshift(review);
      localStorage.setItem(getStorageKey(), JSON.stringify(reviews));

      // Reset form
      form.reset();
      currentRating = 0;
      const ratingVal = document.getElementById("rating-val");
      if (ratingVal) ratingVal.textContent = "0/5";
      highlightStars(0, document.querySelectorAll("#star-rating .star-btn"));

      StoryVerse.showToast("Thank you for your magical review! 💬 ✨");
      renderReviews();
    });
  }

  /* ========== SCROLL TO TOP ========== */
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

  // Stop TTS on page leave
  window.addEventListener("beforeunload", () => { if (synth) synth.cancel(); });

  // Initialize on DOM ready
  document.addEventListener("DOMContentLoaded", init);

  return { toggleTTS, stopTTS, setFontSize, toggleLike, toggleBookmark, shareStory };
})();
