/* ============================================
  MAIN SITE JS
   ============================================ */

// ---- Smooth scrolling (Lenis) ----
// Requires the Lenis <link>/<script> tags in <head>/<body> (see any page's head).
if (typeof Lenis !== "undefined") {
  var lenis = new Lenis({
    duration: 1.1,
    easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
  });
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}

document.addEventListener("DOMContentLoaded", function () {
  // Mobile nav toggle
  var navToggle = document.querySelector("[data-nav-toggle]");
  var navLinks = document.querySelector("[data-nav-links]");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      navLinks.classList.toggle("open");
    });

    // Close menu when a link is tapped (mobile)
    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("open");
      });
    });
  }

  // Contact form: submits to whatever URL is set in the form's
  // action="" attribute (Formspree by default — see contact.html).
  var form = document.querySelector("[data-contact-form]");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var status = form.querySelector("[data-form-status]");
      var submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;

      fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      })
        .then(function (response) {
          if (response.ok) {
            if (status) {
              status.textContent = "Thanks — message received. I'll reply within a day.";
              status.style.color = "var(--accent)";
            }
            form.reset();
          } else {
            throw new Error("Submission failed");
          }
        })
        .catch(function () {
          if (status) {
            status.textContent = "Something went wrong — please email directly instead.";
            status.style.color = "#e0555a";
          }
        })
        .finally(function () {
          if (submitBtn) submitBtn.disabled = false;
        });
    });
  }

  // FAQ accordion
  document.querySelectorAll("[data-faq-toggle]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.closest(".faq-item");
      item.classList.toggle("open");
    });
  });

  // Rotating role titles in the hero (e.g. "WordPress Developer" -> "Web Designer" -> ...)
  var roleEl = document.querySelector("[data-roles]");
  if (roleEl) {
    var roles = roleEl.getAttribute("data-roles").split(",");
    var i = 0;
    setInterval(function () {
      roleEl.classList.add("fade");
      setTimeout(function () {
        i = (i + 1) % roles.length;
        roleEl.textContent = roles[i];
        roleEl.classList.remove("fade");
      }, 250);
    }, 2400);
  }

  // ---- Back to top button (injected on every page) ----
  var topBtn = document.createElement("button");
  topBtn.className = "back-to-top";
  topBtn.setAttribute("aria-label", "Back to top");
  topBtn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
  document.body.appendChild(topBtn);
  topBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  window.addEventListener("scroll", function () {
    topBtn.classList.toggle("visible", window.scrollY > 400);
    var headerEl = document.querySelector("header");
    if (headerEl) headerEl.classList.toggle("scrolled", window.scrollY > 8);
  });

  // ---- WhatsApp floating button (injected on every page) ----
  // Replace the number below with the real WhatsApp number (country code, no + or spaces).
  var waNumber = "8801764805320";
  var waBtn = document.createElement("a");
  waBtn.className = "whatsapp-float";
  waBtn.href = "https://wa.me/" + waNumber;
  waBtn.target = "_blank";
  waBtn.rel = "noopener";
  waBtn.setAttribute("aria-label", "Chat on WhatsApp");
  waBtn.innerHTML = '<svg viewBox="0 0 32 32"><path d="M19.1 17.5c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.9-.4-1.9-1-2.7-2-.7-.8-1.2-1.6-1.5-2.2-.1-.2 0-.4.1-.5.2-.2.4-.4.6-.6.2-.2.2-.4.1-.6-.1-.2-.6-1.5-.9-2-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.4-.2.3-.9 1-.9 2.3 0 1.4 1 2.7 1.2 2.9.2.3 1.9 2.9 4.6 4 2.7 1.1 2.7.7 3.2.7.5 0 1.6-.6 1.8-1.2.2-.6.2-1.2.1-1.3-.1-.1-.3-.2-.6-.4zM16 3C9 3 3.4 8.6 3.4 15.6c0 2.5.7 4.8 2 6.8L3 29l6.8-2.2c1.9 1 4.1 1.6 6.3 1.6 7 0 12.6-5.6 12.6-12.6S23 3 16 3z"/></svg>';
  document.body.appendChild(waBtn);

  // ---- Freelancer availability badge + branching menu (injected on every page) ----
  // Replace these with your real photo and profile links.
  var freelancePhoto = "assets/images/favicon2.jpg";
  var upworkUrl = "https://www.upwork.com/freelancers/~0100b8ee671165dd20";
  var fiverrUrl = "https://www.fiverr.com/mi_digital310?public_mode=true";

  var fMenu = document.createElement("div");
  fMenu.className = "freelancer-menu";
  fMenu.innerHTML =
    '<button class="freelancer-badge" data-freelancer-toggle aria-label="Show Upwork and Fiverr profiles" aria-expanded="false">' +
      '<img class="badge-photo" src="' + freelancePhoto + '" ' +
      'onerror="this.onerror=null; this.src=\'assets/images/founder-placeholder.svg\';" alt="M Naim Zomaddar">' +
      '<span class="badge-text">' +
        '<span class="badge-status"><span class="dot"></span>Available</span>' +
        '<span class="badge-platforms">Upwork &amp; Fiverr</span>' +
      "</span>" +
    "</button>" +
    '<svg class="freelancer-connectors" viewBox="0 0 220 150" preserveAspectRatio="none">' +
      '<path class="conn-line" d="M28,132 C28,85 55,85 62,48"/>' +
      '<path class="conn-line" d="M28,132 C95,140 130,118 148,68"/>' +
    "</svg>" +
    '<a class="freelancer-option opt-upwork" href="' + upworkUrl + '" target="_blank" rel="noopener">' +
      '<span class="opt-icon">Up</span><span>Upwork</span>' +
    "</a>" +
    '<a class="freelancer-option opt-fiverr" href="' + fiverrUrl + '" target="_blank" rel="noopener">' +
      '<span class="opt-icon">fi</span><span>Fiverr</span>' +
    "</a>";
  document.body.appendChild(fMenu);

  var fToggle = fMenu.querySelector("[data-freelancer-toggle]");
  var closeFreelancerMenu = function () {
    fMenu.classList.remove("open");
    fToggle.setAttribute("aria-expanded", "false");
  };
  fToggle.addEventListener("click", function (e) {
    e.stopPropagation();
    var isOpen = fMenu.classList.toggle("open");
    fToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
  document.addEventListener("click", function (e) {
    if (!fMenu.contains(e.target)) closeFreelancerMenu();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeFreelancerMenu();
  });

  // ---- Scroll reveal animation ----
  // Auto-applies to common content blocks everywhere, plus anything
  // explicitly marked with [data-reveal]. No need to tag every element by hand.
  var autoRevealSelector =
    ".card, .work-card, .testimonial-card, .blog-card, .price-card, " +
    ".timeline-item, .section-head, .cta";
  document.querySelectorAll(autoRevealSelector).forEach(function (el) {
    el.classList.add("reveal");
  });

  var revealEls = document.querySelectorAll("[data-reveal], .reveal");
  if (revealEls.length && "IntersectionObserver" in window) {
    // Stagger siblings within the same parent for a cascading effect
    var staggerCounts = new Map();
    revealEls.forEach(function (el) {
      var parent = el.parentElement;
      var idx = staggerCounts.get(parent) || 0;
      el.style.transitionDelay = Math.min(idx * 80, 480) + "ms";
      staggerCounts.set(parent, idx + 1);
    });

    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  }

  // ---- Animated skill bars ----
  var skillEls = document.querySelectorAll(".skill");
  if (skillEls.length && "IntersectionObserver" in window) {
    var skillObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          skillObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    skillEls.forEach(function (el) { skillObserver.observe(el); });
  }

  // ---- Portfolio category filter ----
  var filterBtns = document.querySelectorAll("[data-filter]");
  var workCards = document.querySelectorAll("[data-category]");
  if (filterBtns.length && workCards.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        filterBtns.forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        var filter = btn.getAttribute("data-filter");
        workCards.forEach(function (card) {
          var match = filter === "all" || card.getAttribute("data-category") === filter;
          card.classList.toggle("hidden", !match);
        });
      });
    });
  }

  // ---- Blog search + category filter (combined) ----
  var blogCards = document.querySelectorAll("[data-blog-category]");
  var blogFilterBtns = document.querySelectorAll("[data-blog-filter]");
  var blogSearch = document.querySelector("[data-blog-search]");
  if (blogCards.length) {
    var activeCat = "all";
    var applyBlogFilters = function () {
      var query = blogSearch ? blogSearch.value.trim().toLowerCase() : "";
      blogCards.forEach(function (card) {
        var matchesCat = activeCat === "all" || card.getAttribute("data-blog-category") === activeCat;
        var title = card.querySelector("h3");
        var matchesSearch = !query || (title && title.textContent.toLowerCase().indexOf(query) !== -1);
        card.classList.toggle("hidden", !(matchesCat && matchesSearch));
      });
    };
    blogFilterBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        blogFilterBtns.forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        activeCat = btn.getAttribute("data-blog-filter");
        applyBlogFilters();
      });
    });
    if (blogSearch) blogSearch.addEventListener("input", applyBlogFilters);
  }

  // ---- Newsletter form (placeholder until wired to a real provider) ----
  var newsletterForm = document.querySelector("[data-newsletter-form]");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var status = newsletterForm.querySelector("[data-newsletter-status]");
      if (status) status.textContent = "Subscribed — thanks!";
      newsletterForm.reset();
    });
  }

  // ---- Testimonial carousel (Swiper, center mode with blurred side slides) ----
  if (typeof Swiper !== "undefined" && document.querySelector(".testimonial-swiper")) {
    new Swiper(".testimonial-swiper", {
      loop: true,
      centeredSlides: true,
      slidesPerView: 1.15,
      spaceBetween: 22,
      autoplay: { delay: 4500, disableOnInteraction: false },
      pagination: { el: ".testimonial-pagination", clickable: true },
      navigation: { nextEl: ".t-next", prevEl: ".t-prev" },
      breakpoints: {
        700: { slidesPerView: 1.6 },
        980: { slidesPerView: 2.4 },
      },
    });
  }

  // ---- Video introduction modal ----
  var videoTrigger = document.querySelector("[data-video-trigger]");
  var videoModal = document.querySelector("[data-video-modal]");
  if (videoTrigger && videoModal) {
    var videoFrame = videoModal.querySelector(".video-modal-frame");
    var videoId = videoTrigger.getAttribute("data-video-id");

    var openVideo = function () {
      videoFrame.innerHTML =
        '<iframe src="https://www.youtube.com/embed/' + videoId +
        '?autoplay=1&rel=0" title="Introduction video" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
      videoModal.classList.add("open");
    };
    var closeVideo = function () {
      videoModal.classList.remove("open");
      videoFrame.innerHTML = ""; // stop playback
    };

    videoTrigger.addEventListener("click", openVideo);
    videoModal.querySelectorAll("[data-video-close]").forEach(function (el) {
      el.addEventListener("click", closeVideo);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && videoModal.classList.contains("open")) closeVideo();
    });
  }

  // ---- Image preview lightbox (project thumbnails) ----
  var imageModal = document.querySelector("[data-image-modal]");
  if (imageModal) {
    var imageModalImg = imageModal.querySelector("[data-image-modal-img]");

    var openImage = function (src, alt) {
      imageModalImg.src = src;
      imageModalImg.alt = alt || "Project preview";
      imageModal.classList.add("open");
    };
    var closeImage = function () {
      imageModal.classList.remove("open");
      imageModalImg.src = "";
    };

    document.querySelectorAll("[data-img-preview]").forEach(function (thumb) {
      thumb.addEventListener("click", function () {
        var img = thumb.querySelector("img");
        if (img) openImage(img.src, img.alt);
      });
    });
    imageModal.querySelectorAll("[data-image-close]").forEach(function (el) {
      el.addEventListener("click", closeImage);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && imageModal.classList.contains("open")) closeImage();
    });
  }

  // ---- Case study modal (Details buttons on portfolio.html) ----
  var caseModal = document.querySelector("[data-case-modal]");
  if (caseModal) {
    var caseBody = caseModal.querySelector("[data-case-body]");

    var caseStudies = {
      "local-business": {
        title: "Local business website",
        sub: "WordPress · Elementor",
        thumb: "assets/portfolio/local-business.jpg",
        tags: ["WordPress", "Elementor", "Business"],
        challenge: "The client had no website at all and was losing inquiries to competitors who showed up first in local search.",
        solution: "Built a custom WordPress theme with Elementor for easy future edits — service pages, a booking inquiry form, and clear contact info above the fold.",
        results: [["+64%", "More inquiries"], ["1.8s", "Load time"], ["5", "Pages launched"]],
        feedback: "We went from no online presence to getting inquiries in the first week.",
      },
      "clothing-store": {
        title: "Online clothing store",
        sub: "WooCommerce · WordPress",
        thumb: "assets/portfolio/clothing-store.jpg",
        tags: ["WooCommerce", "WordPress", "E-commerce"],
        challenge: "An Instagram-based clothing seller needed a real storefront with inventory and checkout, without losing the brand's casual feel.",
        solution: "Set up a full WooCommerce catalog with custom checkout styling, variant options for size/color, and a mobile-first product browsing experience.",
        results: [["120+", "Products listed"], ["3.1%", "Checkout rate"], ["2.4s", "Load time"]],
        feedback: "Customers can finally check out without DMing us on Instagram.",
      },
      "landing-page": {
        title: "Product launch landing page",
        sub: "HTML/CSS · JavaScript",
        thumb: "assets/portfolio/landing-page.jpg",
        tags: ["HTML/CSS", "JavaScript", "Landing Page"],
        challenge: "A single-day product launch needed a fast, focused page to convert paid ad traffic — no CMS overhead, just speed.",
        solution: "Hand-coded a single-page site with a countdown timer, one clear CTA, and zero unnecessary scripts to keep load time minimal.",
        results: [["0.9s", "Load time"], ["4.2%", "Conversion rate"], ["1", "Day to build"]],
        feedback: "Loaded instantly even on the ad traffic spike — exactly what we needed.",
      },
      "tech-blog": {
        title: "Personal tech blog",
        sub: "WordPress",
        thumb: "assets/portfolio/tech-blog.jpg",
        tags: ["WordPress", "Blog"],
        challenge: "An existing blog on a generic theme had slow load times and no way for readers to filter by topic.",
        solution: "Built a custom blog theme with category filtering, estimated reading time, and image optimization across all existing posts.",
        results: [["-58%", "Load time"], ["+31%", "Pages/session"], ["6", "Categories"]],
        feedback: "Readers actually stay and browse other posts now instead of bouncing.",
      },
      "booking-system": {
        title: "Custom booking system",
        sub: "PHP · JavaScript",
        thumb: "assets/portfolio/booking-system.jpg",
        tags: ["PHP", "JavaScript", "Custom Build"],
        challenge: "The client's scheduling workflow didn't fit any existing WordPress booking plugin — they needed custom availability rules.",
        solution: "Built a standalone PHP + JS booking tool outside WordPress, with custom availability logic and email confirmations on submit.",
        results: [["100%", "Custom logic fit"], ["-3hrs/wk", "Manual scheduling"], ["0", "Plugin conflicts"]],
        feedback: "It finally works exactly the way our booking process actually works.",
      },
      "consulting-redesign": {
        title: "Consulting firm redesign",
        sub: "WordPress · Redesign",
        thumb: "assets/portfolio/consulting-redesign.jpg",
        tags: ["WordPress", "Redesign"],
        challenge: "An outdated site from 2015 was slow, not mobile-friendly, and didn't reflect the firm's current services.",
        solution: "Rebuilt the front end with a modern layout and updated copy structure, while migrating existing content without losing SEO rankings.",
        results: [["-71%", "Load time"], ["+45%", "Mobile traffic"], ["0", "SEO ranking drop"]],
        feedback: "Clients comment on the site now instead of us having to explain it away.",
      },
    };

    var renderCaseStudy = function (slug) {
      var data = caseStudies[slug];
      if (!data) return;

      var tagsHtml = data.tags.map(function (t) { return '<span class="work-tag">' + t + "</span>"; }).join("");
      var resultsHtml = data.results.map(function (r) {
        return '<div class="r-box"><div class="r-num">' + r[0] + '</div><div class="r-label">' + r[1] + "</div></div>";
      }).join("");

      caseBody.innerHTML =
        '<div class="case-thumb"><img src="' + data.thumb + '" onerror="this.onerror=null; this.src=\'assets/images/founder-placeholder.svg\';" alt="' + data.title + '"></div>' +
        '<div class="case-tags">' + tagsHtml + "</div>" +
        "<h2>" + data.title + "</h2>" +
        '<p class="case-sub">' + data.sub + "</p>" +
        '<div class="case-section"><h3>Client Challenge</h3><p>' + data.challenge + "</p></div>" +
        '<div class="case-section"><h3>Solution &amp; Process</h3><p>' + data.solution + "</p></div>" +
        '<div class="case-section"><h3>Results Achieved</h3><div class="case-result-grid">' + resultsHtml + "</div></div>" +
        '<div class="case-section"><h3>Client Feedback</h3><p class="case-feedback">\u201C' + data.feedback + '\u201D</p></div>';
    };

    var openCase = function (slug) {
      renderCaseStudy(slug);
      caseModal.classList.add("open");
      caseBody.scrollTop = 0;
    };
    var closeCase = function () {
      caseModal.classList.remove("open");
    };

    document.querySelectorAll("[data-case-study]").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        openCase(btn.getAttribute("data-case-study"));
      });
    });
    caseModal.querySelectorAll("[data-case-close]").forEach(function (el) {
      el.addEventListener("click", closeCase);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && caseModal.classList.contains("open")) closeCase();
    });
  }
});