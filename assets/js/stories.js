// StoryVerse – Stories Archive (Polish v2)
let currentStories = [];
let displayedCount = 12;
const CARDS_PER_PAGE = 12;

const filters = {
  search:   "",
  category: "",
  age:      "",
  time:     "",
  sort:     "alpha"
};

document.addEventListener("DOMContentLoaded", () => {
  populateCategoryFilter();
  initURLParams();
  setupEventListeners();
  applyFilters();
  initInfiniteScroll();
  initScrollToTop();
  StoryVerse.initTheme();
  lucide.createIcons();
});

/* ---------- 1. Populate category filter ---------- */
function populateCategoryFilter() {
  const select = document.getElementById("filter-category");
  if (!select) return;
  const categories = [...new Set(STORIES_DATA.map(s => s.category))].sort();
  categories.forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    select.appendChild(opt);
  });
}

/* ---------- 2. URL Params (from category click on homepage) ---------- */
function initURLParams() {
  const params = new URLSearchParams(window.location.search);

  const catParam = params.get("category");
  if (catParam) {
    filters.category = catParam;
    const sel = document.getElementById("filter-category");
    if (sel) sel.value = catParam;
    showFilterHeading(catParam);
  }

  const searchParam = params.get("search");
  if (searchParam) {
    filters.search = searchParam;
    const inp = document.getElementById("search-input");
    if (inp) inp.value = searchParam;
  }

  if (params.get("explore")) {
    setTimeout(() => document.getElementById("search-input")?.focus(), 350);
  }
}

/* ---------- 3. Event Listeners ---------- */
function setupEventListeners() {
  const searchInput = document.getElementById("search-input");
  const suggestionsBox = document.getElementById("search-suggestions");
  const clearBtn = document.getElementById("clear-search");
  const catSelect = document.getElementById("filter-category");
  const ageSelect = document.getElementById("filter-age");
  const timeSelect = document.getElementById("filter-time");
  const sortSelect = document.getElementById("sort-by");
  const loadMoreBtn = document.getElementById("load-more-btn");
  const resetBtn = document.getElementById("reset-filters");

  if (searchInput) {
    searchInput.addEventListener("input", e => {
      filters.search = e.target.value.trim();
      displayedCount = CARDS_PER_PAGE;
      applyFilters();
      showSearchSuggestions(filters.search);
      if (clearBtn) clearBtn.classList.toggle("flex", filters.search.length > 0);
      if (clearBtn) clearBtn.classList.toggle("hidden", filters.search.length === 0);
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      if (searchInput) searchInput.value = "";
      filters.search = "";
      clearBtn.classList.add("hidden");
      clearBtn.classList.remove("flex");
      if (suggestionsBox) suggestionsBox.classList.add("hidden");
      displayedCount = CARDS_PER_PAGE;
      applyFilters();
    });
  }

  document.addEventListener("click", e => {
    if (suggestionsBox && searchInput &&
        !searchInput.contains(e.target) && !suggestionsBox.contains(e.target)) {
      suggestionsBox.classList.add("hidden");
    }
  });

  if (catSelect) catSelect.addEventListener("change", e => {
    filters.category = e.target.value;
    displayedCount = CARDS_PER_PAGE;
    showFilterHeading(filters.category);
    applyFilters();
    updateActiveFilters();
  });

  if (ageSelect) ageSelect.addEventListener("change", e => {
    filters.age = e.target.value;
    displayedCount = CARDS_PER_PAGE;
    applyFilters();
    updateActiveFilters();
  });

  if (timeSelect) timeSelect.addEventListener("change", e => {
    filters.time = e.target.value;
    displayedCount = CARDS_PER_PAGE;
    applyFilters();
    updateActiveFilters();
  });

  if (sortSelect) sortSelect.addEventListener("change", e => {
    filters.sort = e.target.value;
    displayedCount = CARDS_PER_PAGE;
    applyFilters();
  });

  if (loadMoreBtn) loadMoreBtn.addEventListener("click", loadMoreCards);
  if (resetBtn) resetBtn.addEventListener("click", resetAllFilters);
}

/* ---------- 4. Search Suggestions ---------- */
function showSearchSuggestions(query) {
  const box = document.getElementById("search-suggestions");
  if (!box) return;
  if (!query || query.length < 2) { box.classList.add("hidden"); return; }

  const matches = STORIES_DATA.filter(s =>
    s.title.toLowerCase().includes(query.toLowerCase()) ||
    s.category.toLowerCase().includes(query.toLowerCase()) ||
    (s.tags || []).some(t => t.toLowerCase().includes(query.toLowerCase()))
  ).slice(0, 6);

  if (matches.length === 0) { box.classList.add("hidden"); return; }

  box.classList.remove("hidden");
  box.innerHTML = matches.map(s => `
    <div class="flex items-center gap-3 px-4 py-3 hover:bg-purple/10 cursor-pointer transition-colors"
         onclick="selectSuggestion('${s.title}', ${s.id})">
      <div class="w-10 h-8 rounded-lg overflow-hidden flex-shrink-0 bg-purple/10">
        ${SVGGenerator.getIllustration(s.title, s.category)}
      </div>
      <div class="flex-1 min-w-0">
        <div class="font-bold text-xs text-slate-800 dark:text-slate-200 truncate">${s.title}</div>
        <div class="text-[10px] text-purple font-bold font-ui uppercase">${s.category}</div>
      </div>
      <i data-lucide="arrow-right" class="w-3.5 h-3.5 text-purple/50 flex-shrink-0"></i>
    </div>
  `).join("");
  lucide.createIcons();
}

function selectSuggestion(title, id) {
  const inp = document.getElementById("search-input");
  const box = document.getElementById("search-suggestions");
  if (inp) { inp.value = title; filters.search = title; }
  if (box) box.classList.add("hidden");
  // Navigate directly to story
  window.location.href = `read.html?id=${id}`;
}

/* ---------- 5. Filter Heading ---------- */
const CATEGORY_EMOJIS = {
  "Fairy Tales": "🧚",
  "Bedtime Stories": "🌙",
  "Moral Stories": "💎",
  "Adventure Stories": "⚔️",
  "Animal Stories": "🐾",
  "Friendship Stories": "🤝",
  "Magic Stories": "✨",
  "Princess Stories": "👑",
  "Space Stories": "🚀",
  "Dinosaur Stories": "🦕",
  "Science Stories": "🔬",
  "Mythology Stories": "⚡"
};

function showFilterHeading(category) {
  const wrap = document.getElementById("filter-heading");
  const titleEl = document.getElementById("filter-title");
  const emojiEl = document.getElementById("filter-emoji");
  const countEl = document.getElementById("filter-count");
  if (!wrap) return;

  if (category) {
    wrap.classList.remove("hidden");
    if (titleEl) titleEl.textContent = category;
    if (emojiEl) emojiEl.textContent = CATEGORY_EMOJIS[category] || "📚";
    const count = STORIES_DATA.filter(s => s.category === category).length;
    if (countEl) countEl.textContent = `(${count} stories)`;
  } else {
    wrap.classList.add("hidden");
  }
}

/* ---------- 6. Active Filters Chips ---------- */
function updateActiveFilters() {
  const wrap = document.getElementById("active-filters");
  if (!wrap) return;
  const chips = [];
  if (filters.category) chips.push({ label: filters.category, key: "category" });
  if (filters.age) chips.push({ label: `Age: ${filters.age}`, key: "age" });
  if (filters.time) chips.push({ label: `Time: ${filters.time}`, key: "time" });

  if (chips.length === 0) { wrap.classList.add("hidden"); return; }
  wrap.classList.remove("hidden");
  wrap.innerHTML = chips.map(c => `
    <button onclick="removeFilter('${c.key}')"
      class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple/10 text-purple font-ui font-bold text-xs border border-purple/20 hover:bg-purple/20 transition-colors">
      ${c.label}
      <i data-lucide="x" class="w-3 h-3"></i>
    </button>
  `).join("");
  lucide.createIcons();
}

function removeFilter(key) {
  filters[key] = "";
  const selMap = { category: "filter-category", age: "filter-age", time: "filter-time" };
  const sel = document.getElementById(selMap[key]);
  if (sel) sel.value = "";
  if (key === "category") showFilterHeading("");
  displayedCount = CARDS_PER_PAGE;
  updateActiveFilters();
  applyFilters();
}

/* ---------- 7. Main Filtering & Sorting Engine ---------- */
function applyFilters() {
  currentStories = STORIES_DATA.filter(story => {
    const q = filters.search.toLowerCase();
    const matchesSearch = !q ||
      story.title.toLowerCase().includes(q) ||
      story.category.toLowerCase().includes(q) ||
      (story.tags || []).some(t => t.toLowerCase().includes(q));

    const matchesCategory = !filters.category || story.category === filters.category;
    const matchesAge = !filters.age || story.ageGroup === filters.age;

    let matchesTime = true;
    if (filters.time === "short") matchesTime = story.readingTime <= 5;
    else if (filters.time === "medium") matchesTime = story.readingTime > 5 && story.readingTime <= 10;
    else if (filters.time === "long") matchesTime = story.readingTime > 10;

    return matchesSearch && matchesCategory && matchesAge && matchesTime;
  });

  // Sort
  switch (filters.sort) {
    case "alpha":     currentStories.sort((a, b) => a.title.localeCompare(b.title)); break;
    case "rating":    currentStories.sort((a, b) => b.rating - a.rating); break;
    case "age-asc":   currentStories.sort((a, b) => a.ageGroup.localeCompare(b.ageGroup)); break;
    case "age-desc":  currentStories.sort((a, b) => b.ageGroup.localeCompare(a.ageGroup)); break;
    case "time-asc":  currentStories.sort((a, b) => a.readingTime - b.readingTime); break;
    case "time-desc": currentStories.sort((a, b) => b.readingTime - a.readingTime); break;
  }

  // Update count display
  const countEl = document.getElementById("story-count-display");
  if (countEl) countEl.textContent = `${currentStories.length} ${currentStories.length === 1 ? "story" : "stories"} found`;

  renderCardsGrid();
}

/* ---------- 8. Render Story Cards ---------- */
function renderCardsGrid() {
  const grid = document.getElementById("stories-grid");
  const emptyState = document.getElementById("empty-state");
  const loadMoreBtn = document.getElementById("load-more-btn");
  const allLoadedMsg = document.getElementById("all-loaded-msg");
  if (!grid) return;

  if (currentStories.length === 0) {
    grid.innerHTML = "";
    if (emptyState) emptyState.classList.remove("hidden");
    if (loadMoreBtn) loadMoreBtn.classList.add("hidden");
    if (allLoadedMsg) allLoadedMsg.classList.add("hidden");
    return;
  }
  if (emptyState) emptyState.classList.add("hidden");

  const visible = currentStories.slice(0, displayedCount);
  grid.innerHTML = visible.map((story, idx) => {
    const isFav = StoryVerse.isFavorite(story.id);
    return `
      <div class="glass-card flex flex-col rounded-3xl overflow-hidden h-full" data-story-id="${story.id}"
           data-aos="fade-up" data-aos-delay="${(idx % 4) * 80}">
        <!-- Cover Art -->
        <div class="w-full aspect-[4/3] bg-slate-100 relative overflow-hidden">
          ${SVGGenerator.getIllustration(story.title, story.category)}
          <span class="absolute top-3 left-3 bg-slate-900/65 text-white backdrop-blur-md px-2.5 py-1 rounded-full text-[9px] font-extrabold tracking-wider font-ui uppercase">
            ${story.category}
          </span>
          <button onclick="toggleCardFavorite(${story.id})"
                  class="fav-btn absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 dark:bg-slate-800/90 flex items-center justify-center shadow hover:scale-110 active:scale-95 transition-all text-red-500">
            <i data-lucide="heart" class="w-4 h-4 ${isFav ? "fill-current" : ""}"></i>
          </button>
        </div>
        <!-- Card Details -->
        <div class="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div class="flex items-center gap-3 text-xs font-bold text-purple dark:text-purple-light mb-2">
              <span class="flex items-center gap-1">
                <i data-lucide="clock" class="w-3 h-3"></i>${story.readingTime} min
              </span>
              <span class="flex items-center gap-1">
                <i data-lucide="smile" class="w-3 h-3"></i>Age ${story.ageGroup}
              </span>
              <span class="ml-auto text-orange flex items-center gap-1 font-extrabold text-xs">⭐ ${story.rating}</span>
            </div>
            <h3 class="text-xl font-bold font-heading text-slate-800 dark:text-white mb-1.5 leading-tight">${story.title}</h3>
            <p class="text-gray-500 dark:text-slate-400 text-xs font-body mb-4 line-clamp-2 leading-relaxed">${story.description}</p>
          </div>
          <a href="read.html?id=${story.id}" class="btn-grad text-center py-2.5 rounded-xl font-ui font-bold text-xs flex items-center justify-center gap-2">
            <span>Read Story</span>
            <i data-lucide="book-open" class="w-3.5 h-3.5"></i>
          </a>
        </div>
      </div>
    `;
  }).join("");

  lucide.createIcons();

  if (displayedCount < currentStories.length) {
    if (loadMoreBtn) loadMoreBtn.classList.remove("hidden");
    if (allLoadedMsg) allLoadedMsg.classList.add("hidden");
  } else {
    if (loadMoreBtn) loadMoreBtn.classList.add("hidden");
    if (allLoadedMsg) allLoadedMsg.classList.remove("hidden");
  }
}

/* ---------- 9. Load More ---------- */
function loadMoreCards() {
  displayedCount += CARDS_PER_PAGE;
  renderCardsGrid();
}

/* ---------- 10. Infinite Scroll ---------- */
function initInfiniteScroll() {
  let debounce = false;
  window.addEventListener("scroll", () => {
    if (debounce || displayedCount >= currentStories.length) return;
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 400) {
      debounce = true;
      setTimeout(() => {
        loadMoreCards();
        debounce = false;
      }, 200);
    }
  });
}

/* ---------- 11. Toggle card favorite ---------- */
function toggleCardFavorite(storyId) {
  const added = StoryVerse.toggleFavorite(storyId);
  const card = document.querySelector(`[data-story-id="${storyId}"]`);
  if (!card) return;
  const heartIcon = card.querySelector(".fav-btn i");
  if (heartIcon) {
    if (added) heartIcon.classList.add("fill-current");
    else heartIcon.classList.remove("fill-current");
  }
}

/* ---------- 12. Reset All Filters ---------- */
function resetAllFilters() {
  filters.search = "";
  filters.category = "";
  filters.age = "";
  filters.time = "";
  filters.sort = "alpha";
  ["search-input","filter-category","filter-age","filter-time"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });
  const sortEl = document.getElementById("sort-by");
  if (sortEl) sortEl.value = "alpha";
  showFilterHeading("");
  const activeFilters = document.getElementById("active-filters");
  if (activeFilters) activeFilters.classList.add("hidden");
  displayedCount = CARDS_PER_PAGE;
  applyFilters();
}

/* ---------- 13. Scroll-to-top ---------- */
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
