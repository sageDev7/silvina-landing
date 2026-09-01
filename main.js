(function () {
  "use strict";

  /* ===== Header: transparente sobre el hero, sólido al hacer scroll ===== */
  var header = document.getElementById("siteHeader");
  var backToTop = document.getElementById("backToTop");
  var waFloat = document.getElementById("waFloat");
  var siteFooter = document.querySelector("footer.site");
  var footerVisible = false;

  function updateFloats() {
    var show = window.scrollY > 500 && !footerVisible;
    if (backToTop) backToTop.classList.toggle("show", show);
    if (waFloat) waFloat.classList.toggle("show", show);
  }
  function onScroll() {
    var scrolled = window.scrollY > 40;
    if (header) header.classList.toggle("sc", scrolled);
    document.body.classList.toggle("scrolled", scrolled);
    updateFloats();
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if (siteFooter) {
    var footerObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) { footerVisible = entry.isIntersecting; });
      updateFloats();
    }, { threshold: 0 });
    footerObserver.observe(siteFooter);
  }
  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ===== Mobile nav ===== */
  var burger = document.getElementById("burger");
  var mnav = document.getElementById("mnav");
  var overlay = document.getElementById("moverlay");

  function closeMenu() {
    burger.classList.remove("open");
    mnav.classList.remove("open");
    overlay.classList.remove("open");
  }
  function toggleMenu() {
    burger.classList.toggle("open");
    mnav.classList.toggle("open");
    overlay.classList.toggle("open");
  }
  if (burger) {
    burger.addEventListener("click", toggleMenu);
    burger.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggleMenu(); }
    });
    overlay.addEventListener("click", closeMenu);
    Array.prototype.forEach.call(mnav.querySelectorAll("a"), function (a) {
      a.addEventListener("click", closeMenu);
    });
  }

  /* ===== Reveal on scroll (y en carga, para lo que ya está en viewport) ===== */
  var revealEls = document.querySelectorAll(".reveal");
  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: .15 });
  revealEls.forEach(function (el) { revealObserver.observe(el); });

})();
