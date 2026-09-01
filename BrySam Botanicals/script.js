/* =============================================================
   BRYSAM BOTANICALS — SCRIPT.JS
   Everything here is plain, vanilla JavaScript (no libraries).
   Sections:
   1. Navbar background change on scroll
   2. Mobile menu open/close
   3. Smooth-scroll + auto-close menu when a link is tapped
   4. Scroll-triggered fade-up animations
   5. Newsletter form (front-end only, no backend)
============================================================= */

/* -------------------------------------------------------------
   1. NAVBAR ON SCROLL
   Adds a subtle border/shadow to the navbar once the page
   has scrolled past the top, so it feels "grounded".
---------------------------------------------------------------- */
const navbar = document.getElementById("navbar");

function updateNavbarOnScroll() {
  if (window.scrollY > 12) {
    navbar.classList.add("is-scrolled");
  } else {
    navbar.classList.remove("is-scrolled");
  }
}

window.addEventListener("scroll", updateNavbarOnScroll);
updateNavbarOnScroll(); // run once on load in case the page loads mid-scroll


/* -------------------------------------------------------------
   2. MOBILE MENU TOGGLE
   Clicking the hamburger button adds/removes the "is-open" and
   "is-active" classes, which CSS uses to animate the menu and
   turn the three bars into an "X".
---------------------------------------------------------------- */
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

function toggleMobileMenu() {
  const isOpen = navLinks.classList.toggle("is-open");
  navToggle.classList.toggle("is-active", isOpen);
  navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
}

navToggle.addEventListener("click", toggleMobileMenu);


/* -------------------------------------------------------------
   3. AUTO-CLOSE MENU ON LINK CLICK
   Once someone taps a link inside the mobile menu, close the
   menu so they land straight on the section (smooth scrolling
   is handled by the CSS "scroll-behavior: smooth" rule).
---------------------------------------------------------------- */
const allNavLinkAnchors = navLinks.querySelectorAll("a");

allNavLinkAnchors.forEach((link) => {
  link.addEventListener("click", () => {
    if (navLinks.classList.contains("is-open")) {
      toggleMobileMenu();
    }
  });
});


/* -------------------------------------------------------------
   4. SCROLL-TRIGGERED FADE-UP ANIMATIONS
   Every element with the "fade-up" class starts hidden (see
   CSS). IntersectionObserver watches the page and adds
   "is-visible" the moment an element scrolls into view, which
   CSS then animates with a transition.
---------------------------------------------------------------- */
const fadeElements = document.querySelectorAll(".fade-up");

const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        // Once an element has faded in, stop watching it —
        // we don't need it to fade in again if the user scrolls back up.
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15, // trigger once 15% of the element is visible
    rootMargin: "0px 0px -40px 0px",
  }
);

fadeElements.forEach((el) => fadeObserver.observe(el));


/* -------------------------------------------------------------
   5. NEWSLETTER FORM
   No backend exists yet, so this simply prevents the page from
   reloading and shows a friendly confirmation message instead.
   When a backend is ready, replace the "TODO" block below with
   a real fetch() request to your email service.
---------------------------------------------------------------- */
const newsletterForm = document.getElementById("newsletterForm");
const newsletterNote = document.getElementById("newsletterNote");

newsletterForm.addEventListener("submit", (event) => {
  event.preventDefault(); // stop the default full-page form submission

  const emailInput = document.getElementById("newsletterEmail");
  const email = emailInput.value.trim();

  if (!email) {
    return;
  }

  // TODO: replace this with a real request once a backend/email
  // service (e.g. Mailchimp, ConvertKit) is connected.
  newsletterNote.textContent = "Thank you for joining the BrySam community.";
  newsletterForm.reset();
});
