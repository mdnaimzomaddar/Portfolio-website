/* ============================================
   PARTIALS — single source of truth for the
   header and footer. Edit ONLY here, and every
   page picks up the change automatically.

   Load this script BEFORE theme-toggle.js and
   main.js, right after <div id="site-header">
   and <div id="site-footer"> already exist in
   the DOM (i.e. place it near the end of <body>).
   ============================================ */

(function () {
  var headerHTML = `
  <header>
    <div class="wrap nav">
      <a href="index.html" class="logo">Naim <span>Zomaddar</span></a>
      <ul class="nav-links" data-nav-links>
        <li><a href="index.html" data-page="index.html">Home</a></li>
        <li><a href="about.html" data-page="about.html">About</a></li>
        <li><a href="services.html" data-page="services.html">Services</a></li>
        <li><a href="portfolio.html" data-page="portfolio.html">Portfolio</a></li>
        <li><a href="blog.html" data-page="blog.html">Blog</a></li>
        <li><a href="contact.html" data-page="contact.html">Contact</a></li>
      </ul>
      <div class="nav-right">
        <button class="theme-switch" data-theme-toggle aria-label="Toggle dark mode" aria-pressed="false">
          <svg class="icon-sun" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4.5"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/></svg>
          <svg class="icon-moon" viewBox="0 0 24 24"><path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5z"/></svg>
        </button>
        <a href="contact.html" class="btn btn-primary btn-sm">Hire Me</a>
        <button class="nav-toggle" data-nav-toggle aria-label="Open menu"><span></span><span></span><span></span></button>
      </div>
    </div>
  </header>`;

  var footerHTML = `
  <footer>
    <div class="wrap foot-row">
      <div class="copyright">© 2026 M Naim Zomaddar</div>
      <ul class="foot-links">
        <li><a href="about.html">About</a></li>
        <li><a href="services.html">Services</a></li>
        <li><a href="portfolio.html">Portfolio</a></li>
        <li><a href="packages.html">Packages</a></li>
        <li><a href="blog.html">Blog</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
    </div>
  </footer>`;

  var headerSlot = document.getElementById("site-header");
  var footerSlot = document.getElementById("site-footer");
  if (headerSlot) headerSlot.innerHTML = headerHTML;
  if (footerSlot) footerSlot.innerHTML = footerHTML;

  // Header is position:fixed (removed from layout flow), so push body
  // content down by the header's real height to avoid overlap.
  function syncHeaderHeight() {
    var headerEl = document.querySelector("header");
    if (headerEl) {
      document.body.style.paddingTop = headerEl.offsetHeight + "px";
    }
  }
  syncHeaderHeight();
  window.addEventListener("load", syncHeaderHeight);
  window.addEventListener("resize", syncHeaderHeight);

  // Mark the current page's nav link as active
  var current = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("[data-page]").forEach(function (link) {
    if (link.getAttribute("data-page") === current) {
      link.classList.add("active");
    }
  });
})();