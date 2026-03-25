gsap.registerPlugin(ScrollTrigger);

function createLanterns() {
  const container = document.getElementById("lanterns");
  if (!container) return;
  for (let i = 0; i < 14; i++) {
    const lantern = document.createElement("img");
    lantern.src = "assets/latern.png";
    lantern.className = "lantern";
    lantern.style.left = Math.random() * 100 + "vw";
    lantern.style.animationDuration = 20 + Math.random() * 20 + "s";
    lantern.style.animationDelay = "-" + Math.random() * 40 + "s";
    container.appendChild(lantern);
  }
}

function createPetals() {
  const container = document.getElementById("petals-container");
  if (!container) return;
  for (let i = 0; i < 35; i++) {
    const petal = document.createElement("div");
    petal.className = "petal";
    petal.style.left = Math.random() * 100 + "vw";
    petal.style.animationDuration = 6 + Math.random() * 10 + "s";
    petal.style.animationDelay = "-" + Math.random() * 12 + "s";
    petal.style.opacity = Math.random() * 0.6 + 0.4;
    container.appendChild(petal);
  }
}

function setupAnimations() {
  const templeGroup = document.getElementById("temple-group");
  const templeImg = document.getElementById("temple");
  const names = document.getElementById("names");
  const thoranam = document.getElementById("thoranam-bottom");

  if (!templeGroup || !names || !thoranam) return;

  const mm = gsap.matchMedia();

  // DESKTOP VIEW
  mm.add("(min-width: 768px)", () => {
    // 1. Initial Load Animation
    gsap.fromTo(templeImg,
      { scale: 0.8, opacity: 0 },
      { scale: 1.1, opacity: 1, duration: 2.5, ease: "power2.out" }
    );

    // 2. Scroll Animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "+=200%",
        scrub: 1.5,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true
      },
    });

    tl.to(templeGroup, {
      scale: 1.5,
      y: -1200,
      ease: "none",
      immediateRender: false
    }, 0);

    tl.to(names, {
      opacity: 0,
      y: -100,
      ease: "none"
    }, 0);

    tl.to(thoranam, {
      opacity: 1,
      ease: "power1.inOut"
    }, 0.6);
  });

  // MOBILE VIEW
  mm.add("(max-width: 767px)", () => {
    // 1. Initial Load Animation
    gsap.fromTo(templeImg,
      { scale: 1.0, opacity: 0 },
      { scale: 1.1, opacity: 1, duration: 2.5, ease: "power2.out" }
    );

    // 2. Scroll Animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "+=180%",
        scrub: 1.5,
        pin: true,
        invalidateOnRefresh: true,
      },
    });

    tl.to(templeGroup, {
      scale: 1.3,
      y: -450,
      ease: "none",
      immediateRender: false
    }, 0);

    tl.to(names, {
      opacity: 0,
      y: -50,
      ease: "none"
    }, 0);

    tl.to(thoranam, {
      opacity: 1,
      ease: "power1.inOut"
    }, 0.7);
  });
}

function startCountdown() {
  const target = new Date("2026-03-29T21:52:00").getTime();
  const circleCircumference = 364.4;

  function updateCircle(id, value, max) {
    const ring = document.getElementById(`${id}-ring`);
    const valText = document.getElementById(`${id}-val`);
    if (ring && valText) {
      const offset = circleCircumference - (value / max) * circleCircumference;
      ring.style.strokeDashoffset = offset;
      valText.innerText = value.toString().padStart(2, "0");
    }
  }

  const timer = setInterval(() => {
    const now = new Date().getTime();
    const diff = target - now;

    if (diff > 0) {
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      updateCircle("days", days, 30);
      updateCircle("hours", hours, 24);
      updateCircle("minutes", minutes, 60);
      updateCircle("seconds", seconds, 60);
    } else {
      clearInterval(timer);
      const container = document.querySelector(".flex-wrap.justify-center");
      if (container)
        container.innerHTML =
          "<h2 class='text-4xl font-serif text-teal-600'>The Wedding Celebration has Begun!</h2>";
    }
  }, 1000);
}

function initCursor() {
  const cursor = document.getElementById("custom-cursor");
  if (!cursor) return;

  window.addEventListener("mousemove", (e) => {
    gsap.to(cursor, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.2,
      ease: "power2.out",
      xPercent: -50,
      yPercent: -50,
    });
  });

  document.querySelectorAll("a, button").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      gsap.to(cursor, { scale: 1.5, opacity: 0.6 });
    });
    el.addEventListener("mouseleave", () => {
      gsap.to(cursor, { scale: 1, opacity: 0.4 });
    });
  });
}

// Final Initialization
window.addEventListener("load", () => {
  createLanterns();
  createPetals();
  setupAnimations(); // Combined temple animation and initial load
  startCountdown();
  initCursor();

  // Refresh ScrollTrigger to ensure pinning points are correct
  ScrollTrigger.refresh();
});