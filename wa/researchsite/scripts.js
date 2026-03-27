document.addEventListener("DOMContentLoaded", () => {
  const cursor = document.querySelector(".cursor");

  if (cursor) {
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animateCursor() {
      currentX += (mouseX - currentX) * 0.18;
      currentY += (mouseY - currentY) * 0.18;

      cursor.style.left = `${currentX}px`;
      cursor.style.top = `${currentY}px`;

      requestAnimationFrame(animateCursor);
    }

    animateCursor();

    const hoverTargets = document.querySelectorAll("a, button");
    const textTargets = document.querySelectorAll("p, blockquote, h1, h2, h3, figcaption, li");

    hoverTargets.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursor.classList.add("is-hovering");
      });

      el.addEventListener("mouseleave", () => {
        cursor.classList.remove("is-hovering");
      });
    });

    textTargets.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        if (!cursor.classList.contains("is-hovering")) {
          cursor.classList.add("is-reading");
        }
      });

      el.addEventListener("mouseleave", () => {
        cursor.classList.remove("is-reading");
      });
    });
  }

  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".site-nav a");

  function setActiveLink() {
    let currentId = "";

    sections.forEach((section) => {
      const offset = 140;
      const top = section.offsetTop - offset;
      const bottom = top + section.offsetHeight;

      if (window.scrollY >= top && window.scrollY < bottom) {
        currentId = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");

      if (link.getAttribute("href") === `#${currentId}`) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", setActiveLink);
  setActiveLink();
});