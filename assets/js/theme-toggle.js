/* ============================================
   THEME TOGGLE — button logic
   The early "no-flash" snippet lives inline in
   each page's <head> (see index.html for it).
   This file just wires up the click + memory.
   ============================================ */

document.addEventListener("DOMContentLoaded", function () {
  var btn = document.querySelector("[data-theme-toggle]");
  if (!btn) return;

  btn.addEventListener("click", function () {
    var root = document.documentElement;
    var current = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
    var next = current === "dark" ? "light" : "dark";

    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    btn.setAttribute("aria-pressed", next === "dark");
  });

  var initial = document.documentElement.getAttribute("data-theme") === "dark";
  btn.setAttribute("aria-pressed", initial);
});