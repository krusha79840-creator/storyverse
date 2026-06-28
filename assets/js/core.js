// StoryVerse Core JS - Global Utilities and LocalStorage Managers
const StoryVerse = {
  FAVORITES_KEY: "storyverse_favorites",
  BOOKMARKS_KEY: "storyverse_bookmarks",
  LIKES_KEY: "storyverse_likes",
  DARK_MODE_KEY: "storyverse_dark_mode",

  // --- Theme Management ---
  initTheme() {
    const savedTheme = localStorage.getItem(this.DARK_MODE_KEY);
    const root = document.documentElement;
    
    if (savedTheme === "enabled") {
      root.classList.add("dark-mode");
      root.classList.add("dark"); // Tailwind dark: variant support
      this.updateDarkModeToggles(true);
    } else {
      root.classList.remove("dark-mode");
      root.classList.remove("dark");
      this.updateDarkModeToggles(false);
    }
  },

  toggleTheme() {
    const root = document.documentElement;
    const isDark = root.classList.toggle("dark-mode");
    if (isDark) {
      root.classList.add("dark"); // Tailwind dark: variant support
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem(this.DARK_MODE_KEY, isDark ? "enabled" : "disabled");
    this.updateDarkModeToggles(isDark);
    
    // Play subtle puff animation or confetti trigger
    this.showToast(isDark ? "🌙 Night theme active! Sweet dreams!" : "☀️ Bright theme active! Good morning!", "info");
    
    // Fire event for listening pages (like read.html to update custom panels)
    window.dispatchEvent(new CustomEvent("themeChanged", { detail: { isDark } }));
  },

  updateDarkModeToggles(isDark) {
    const toggles = document.querySelectorAll(".dark-mode-toggle-btn");
    toggles.forEach(btn => {
      if (isDark) {
        btn.innerHTML = `<i data-lucide="sun" class="w-5 h-5 text-amber-300"></i>`;
      } else {
        btn.innerHTML = `<i data-lucide="moon" class="w-5 h-5 text-indigo-700"></i>`;
      }
    });
    if (typeof lucide !== "undefined") {
      lucide.createIcons();
    }
  },

  // --- Sticky Navbar behavior ---
  initNavbar() {
    const navbar = document.getElementById("main-navbar");
    if (!navbar) return;
    
    window.addEventListener("scroll", () => {
      if (window.scrollY > 40) {
        navbar.classList.add("navbar-scrolled");
      } else {
        navbar.classList.remove("navbar-scrolled");
      }
    });

    // Mobile menu toggle
    const menuBtn = document.getElementById("mobile-menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    if (menuBtn && mobileMenu) {
      menuBtn.addEventListener("click", () => {
        const isHidden = mobileMenu.classList.contains("hidden");
        if (isHidden) {
          mobileMenu.classList.remove("hidden");
          // GSAP fade-in if available
          if (typeof gsap !== "undefined") {
            gsap.fromTo(mobileMenu, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" });
          }
        } else {
          mobileMenu.classList.add("hidden");
        }
      });
    }
  },

  // --- Toast Notifications System ---
  showToast(message, type = "success") {
    let container = document.getElementById("toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "toast-container";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `toast glass-panel border-l-4 ${
      type === "error" ? "border-red-500" : type === "info" ? "border-sky-400" : "border-emerald-400"
    }`;

    let icon = "sparkles";
    if (type === "error") icon = "alert-triangle";
    if (type === "info") icon = "info";

    toast.innerHTML = `
      <div class="flex items-center gap-3">
        <i data-lucide="${icon}" class="${
          type === "error" ? "text-red-500" : type === "info" ? "text-sky-400" : "text-emerald-400"
        } w-6 h-6"></i>
        <span>${message}</span>
      </div>
    `;

    container.appendChild(toast);
    if (typeof lucide !== "undefined") lucide.createIcons();

    // Trigger sliding entry
    setTimeout(() => {
      toast.classList.add("show");
    }, 10);

    // Auto removal
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => {
        toast.remove();
      }, 400);
    }, 3500);
  },

  // --- Favorites & Bookmarks logic ---
  getFavorites() {
    const list = localStorage.getItem(this.FAVORITES_KEY);
    return list ? JSON.parse(list) : [];
  },

  isFavorite(storyId) {
    return this.getFavorites().includes(Number(storyId));
  },

  toggleFavorite(storyId) {
    const id = Number(storyId);
    let favs = this.getFavorites();
    const index = favs.indexOf(id);
    let added = false;
    
    if (index === -1) {
      favs.push(id);
      added = true;
      this.showToast("Added to your Magical Favorites! ❤️");
      // Trigger confetti on add!
      if (typeof confetti !== "undefined") {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.85 }
        });
      }
    } else {
      favs.splice(index, 1);
      this.showToast("Removed from Favorites.");
    }
    
    localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(favs));
    return added;
  },

  getBookmarks() {
    const list = localStorage.getItem(this.BOOKMARKS_KEY);
    return list ? JSON.parse(list) : [];
  },

  isBookmarked(storyId) {
    return this.getBookmarks().includes(Number(storyId));
  },

  toggleBookmark(storyId) {
    const id = Number(storyId);
    let marks = this.getBookmarks();
    const index = marks.indexOf(id);
    let added = false;
    
    if (index === -1) {
      marks.push(id);
      added = true;
      this.showToast("Story Bookmarked! You can resume reading anytime. 🔖");
    } else {
      marks.splice(index, 1);
      this.showToast("Bookmark removed.");
    }
    
    localStorage.setItem(this.BOOKMARKS_KEY, JSON.stringify(marks));
    return added;
  },

  getLikes() {
    const list = localStorage.getItem(this.LIKES_KEY);
    return list ? JSON.parse(list) : [];
  },

  isLiked(storyId) {
    return this.getLikes().includes(Number(storyId));
  },

  toggleLike(storyId) {
    const id = Number(storyId);
    let likes = this.getLikes();
    const index = likes.indexOf(id);
    let added = false;
    
    if (index === -1) {
      likes.push(id);
      added = true;
      this.showToast("You liked this story! 👍");
    } else {
      likes.splice(index, 1);
      this.showToast("Like removed.");
    }
    
    localStorage.setItem(this.LIKES_KEY, JSON.stringify(likes));
    return added;
  },

  // Share Utility
  shareStory(title, url = window.location.href) {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: `Read this magical story on StoryVerse: "${title}"!`,
        url: url
      }).catch(err => console.log(err));
    } else {
      // Copy to clipboard fallback
      navigator.clipboard.writeText(url).then(() => {
        this.showToast("Link copied to clipboard! Share it with your friends! 🔗");
      });
    }
  }
};

// Auto-run on page load
document.addEventListener("DOMContentLoaded", () => {
  StoryVerse.initTheme();
  StoryVerse.initNavbar();
});
