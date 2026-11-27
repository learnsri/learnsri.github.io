
/* ==================================================
   LEARN37 — COMPLETE WEBSITE JAVASCRIPT
   ================================================== */

document.addEventListener("DOMContentLoaded", function () {

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;


  /* ==================================================
     MOBILE NAVIGATION
     ================================================== */

  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  function closeMenu() {

    if (!menuToggle || !navLinks) return;

    navLinks.classList.remove("active");

    menuToggle.textContent = "☰";

    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );

  }

  if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", function () {

      const isOpen = navLinks.classList.toggle("active");

      menuToggle.textContent = isOpen ? "✕" : "☰";

      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

    });

    navLinks.querySelectorAll("a").forEach(function (link) {

      link.addEventListener("click", closeMenu);

    });

    document.addEventListener("keydown", function (event) {

      if (event.key === "Escape") {

        closeMenu();

      }

    });

    document.addEventListener("click", function (event) {

      if (
        !navLinks.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {

        closeMenu();

      }

    });

    window.addEventListener("resize", function () {

      if (window.innerWidth > 768) {

        closeMenu();

      }

    });

  }


  /* ==================================================
     COUNTDOWN TIMER
     ================================================== */

  const eventStart = new Date(
    "2026-11-30T08:30:00+05:30"
  ).getTime();

  const eventEnd = new Date(
    "2026-12-02T00:00:00+05:30"
  ).getTime();

  const countdownLabel =
    document.getElementById("countdownLabel");

  const countdown =
    document.querySelector(".countdown");

  function updateCountdown() {

    const now = Date.now();

    const distance = eventStart - now;

    if (distance <= 0) {

      if (countdownLabel) {

        countdownLabel.textContent =
          now < eventEnd
            ? "WELCOME TO LEARN37"
            : "THANK YOU FOR JOINING LEARN37";

      }

      if (countdown) {

        countdown.hidden = true;

      }

      return;

    }

    const days = Math.floor(
      distance / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
      (distance / (1000 * 60 * 60)) % 24
    );

    const minutes = Math.floor(
      (distance / (1000 * 60)) % 60
    );

    const seconds = Math.floor(
      (distance / 1000) % 60
    );

    const values = {
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds
    };

    Object.entries(values).forEach(function (entry) {

      const element = document.getElementById(entry[0]);

      if (element) {

        element.textContent = String(entry[1]).padStart(
          2,
          "0"
        );

      }

    });

  }

  updateCountdown();

  setInterval(updateCountdown, 1000);


  /* ==================================================
     PROGRAMME DAY TABS
     ================================================== */

  const tabButtons =
    document.querySelectorAll(".tab-button");

  const programmeContents =
    document.querySelectorAll(".programme-content");

  tabButtons.forEach(function (button) {

    button.addEventListener("click", function () {

      const selectedDay = button.dataset.day;

      const selectedContent =
        document.getElementById(selectedDay);

      if (!selectedContent) return;

      tabButtons.forEach(function (tab) {

        tab.classList.remove("active");

        tab.setAttribute(
          "aria-pressed",
          "false"
        );

      });

      programmeContents.forEach(function (content) {

        content.classList.remove("active");

        content.hidden = true;

      });

      button.classList.add("active");

      button.setAttribute(
        "aria-pressed",
        "true"
      );

      selectedContent.hidden = false;

      selectedContent.classList.add("active");

    });

  });


  /* ==================================================
     SCROLL REVEAL ANIMATIONS
     ================================================== */

  const revealElements =
    document.querySelectorAll(".reveal");

  if (
    !reducedMotion &&
    "IntersectionObserver" in window
  ) {

    document.body.classList.add("js-ready");

    const revealObserver = new IntersectionObserver(

      function (entries, observer) {

        entries.forEach(function (entry) {

          if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            observer.unobserve(entry.target);

          }

        });

      },

      {
        threshold: 0.05,
        rootMargin: "0px 0px 20px 0px"
      }

    );

    revealElements.forEach(function (element) {

      revealObserver.observe(element);

    });

    /* Staggered partner entrances */

    document.querySelectorAll(".pn-row").forEach(

      function (row, index) {

        row.style.setProperty(
          "--reveal-delay",
          (index % 3) * 130 + "ms"
        );

      }

    );

  } else {

    revealElements.forEach(function (element) {

      element.classList.add("visible");

    });

  }


  /* ==================================================
     PARTNER NETWORK ANIMATION CONTROL
     ================================================== */

  const partnerSection =
    document.getElementById("partners");

  if (
    partnerSection &&
    !reducedMotion &&
    "IntersectionObserver" in window
  ) {

    let partnerSectionVisible = false;

    function updatePartnerAnimation() {

      const shouldAnimate =
        partnerSectionVisible && !document.hidden;

      partnerSection.classList.toggle(
        "animation-paused",
        !shouldAnimate
      );

    }

    const partnerObserver = new IntersectionObserver(

      function (entries) {

        entries.forEach(function (entry) {

          partnerSectionVisible = entry.isIntersecting;

          updatePartnerAnimation();

        });

      },

      {
        threshold: 0
      }

    );

    partnerObserver.observe(partnerSection);

    document.addEventListener(
      "visibilitychange",
      updatePartnerAnimation
    );

    updatePartnerAnimation();

  }


  /* ==================================================
     ACTIVE NAVIGATION LINK
     ================================================== */

  const sections =
    document.querySelectorAll("section[id]");

  const navigationLinks =
    document.querySelectorAll(".nav-links a");

  let scrollTicking = false;

  function updateActiveNavigation() {

    let currentSection = "home";

    sections.forEach(function (section) {

      const sectionTop =
        section.getBoundingClientRect().top;

      if (sectionTop <= 180) {

        currentSection = section.id;

      }

    });

    navigationLinks.forEach(function (link) {

      const active =
        link.getAttribute("href") === "#" + currentSection;

      link.classList.toggle("active", active);

      if (active) {

        link.setAttribute(
          "aria-current",
          "location"
        );

      } else {

        link.removeAttribute("aria-current");

      }

    });

    scrollTicking = false;

  }

  window.addEventListener(

    "scroll",

    function () {

      if (!scrollTicking) {

        requestAnimationFrame(updateActiveNavigation);

        scrollTicking = true;

      }

    },

    { passive: true }

  );

  updateActiveNavigation();


  /* ==================================================
     ANIMATED NETWORK GLOBE
     ================================================== */

  const canvas =
    document.getElementById("networkCanvas");

  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  if (!ctx) return;

  let width = 0;
  let height = 0;

  let centerX = 0;
  let centerY = 0;

  let radius = 0;

  let animationFrame = null;

  let globeVisible = true;

  let lastTimestamp = 0;

  let rotationAngle = 0.5;


  /* CREATE SPHERICAL NETWORK POINTS */

  const pointCount = 160;

  const points = [];

  const goldenAngle =
    Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < pointCount; i++) {

    const y = 1 - (i / (pointCount - 1)) * 2;

    const horizontalRadius =
      Math.sqrt(Math.max(0, 1 - y * y));

    const theta = goldenAngle * i;

    points.push({

      x: Math.cos(theta) * horizontalRadius,

      y: y,

      z: Math.sin(theta) * horizontalRadius

    });

  }


  /* CREATE BACKGROUND PARTICLES */

  const stars = Array.from(

    { length: 75 },

    function () {

      return {

        x: Math.random(),

        y: Math.random(),

        size: 0.3 + Math.random() * 1.7,

        opacity: 0.1 + Math.random() * 0.6,

        phase: Math.random() * Math.PI * 2

      };

    }

  );


  /* RESPONSIVE CANVAS SIZE */

  function resizeCanvas() {

    const dpr = Math.min(
      window.devicePixelRatio || 1,
      2
    );

    width = canvas.clientWidth;

    height = canvas.clientHeight;

    canvas.width = Math.round(width * dpr);

    canvas.height = Math.round(height * dpr);

    ctx.setTransform(
      dpr, 0, 0, dpr, 0, 0
    );

    if (window.innerWidth <= 768) {

      radius = Math.min(
        width * 0.36,
        170
      );

      centerX = width * 0.65;

      centerY = height * 0.73;

    } else {

      radius = Math.min(
        width * 0.24,
        height * 0.34
      );

      centerX = width * 0.76;

      centerY = height * 0.46;

    }

  }


  /* DRAW TWINKLING PARTICLES */

  function drawStars(time) {

    stars.forEach(function (star) {

      const twinkle = reducedMotion

        ? 1

        : 0.7 + 0.3 * Math.sin(
            time * 0.001 + star.phase
          );

      ctx.beginPath();

      ctx.fillStyle =
        "rgba(170,235,255," +
        star.opacity * twinkle +
        ")";

      ctx.arc(

        star.x * width,

        star.y * height,

        star.size,

        0,

        Math.PI * 2

      );

      ctx.fill();

    });

  }


  /* PROJECT 3D POINTS TO 2D */

  function projectPoints(angle) {

    const cosAngle = Math.cos(angle);

    const sinAngle = Math.sin(angle);

    const tilt = 0.2;

    const cosTilt = Math.cos(tilt);

    const sinTilt = Math.sin(tilt);

    return points.map(function (point) {

      const rotatedX =
        point.x * cosAngle -
        point.z * sinAngle;

      const rotatedZ =
        point.x * sinAngle +
        point.z * cosAngle;

      const tiltedY =
        point.y * cosTilt -
        rotatedZ * sinTilt;

      const tiltedZ =
        point.y * sinTilt +
        rotatedZ * cosTilt;

      const perspective =
        3 / (3 - tiltedZ);

      return {

        x: centerX +
          rotatedX * radius * perspective,

        y: centerY +
          tiltedY * radius * perspective,

        z: tiltedZ,

        scale: perspective

      };

    });

  }


  /* DRAW GLOBE GLOW */

  function drawGlobeGlow() {

    const gradient = ctx.createRadialGradient(

      centerX,

      centerY,

      radius * 0.15,

      centerX,

      centerY,

      radius * 1.6

    );

    gradient.addColorStop(
      0,
      "rgba(0,187,199,0.12)"
    );

    gradient.addColorStop(
      0.5,
      "rgba(0,149,202,0.08)"
    );

    gradient.addColorStop(
      1,
      "rgba(0,187,199,0)"
    );

    ctx.fillStyle = gradient;

    ctx.beginPath();

    ctx.arc(

      centerX,

      centerY,

      radius * 1.6,

      0,

      Math.PI * 2

    );

    ctx.fill();

  }


  /* DRAW NETWORK CONNECTIONS */

  function drawConnections(projectedPoints) {

    const maxDistance = radius * 0.32;

    for (
      let i = 0;
      i < projectedPoints.length;
      i++
    ) {

      const pointA = projectedPoints[i];

      if (pointA.z < -0.25) continue;

      for (
        let j = i + 1;
        j < projectedPoints.length;
        j++
      ) {

        const pointB = projectedPoints[j];

        if (pointB.z < -0.25) continue;

        const dx = pointA.x - pointB.x;

        const dy = pointA.y - pointB.y;

        const distance = Math.sqrt(
          dx * dx + dy * dy
        );

        if (distance < maxDistance) {

          const opacity =

            0.5 * (1 - distance / maxDistance);

          ctx.strokeStyle =

            "rgba(0,220,255," + opacity + ")";

          ctx.lineWidth = 0.8;

          ctx.beginPath();

          ctx.moveTo(pointA.x, pointA.y);

          ctx.lineTo(pointB.x, pointB.y);

          ctx.stroke();

        }

      }

    }

  }


  /* DRAW GLOWING NETWORK NODES */

  function drawNodes(projectedPoints) {

    const sortedPoints =

      projectedPoints.slice().sort(

        function (a, b) {

          return a.z - b.z;

        }

      );

    sortedPoints.forEach(function (point) {

      const opacity =

        0.2 + 0.8 * ((point.z + 1) / 2);

      const nodeSize =

        1.5 * point.scale;

      ctx.beginPath();

      ctx.fillStyle =

        "rgba(160,255,255," + opacity + ")";

      ctx.arc(

        point.x,

        point.y,

        nodeSize,

        0,

        Math.PI * 2

      );

      ctx.fill();

      if (point.z > 0.75) {

        ctx.beginPath();

        ctx.fillStyle =

          "rgba(0,224,191,0.12)";

        ctx.arc(

          point.x,

          point.y,

          nodeSize * 3,

          0,

          Math.PI * 2

        );

        ctx.fill();

      }

    });

  }


  /* DRAW ANIMATED ORBITAL RINGS */

  function drawOrbits(time) {

    const movement = reducedMotion

      ? 0

      : Math.sin(time * 0.0003) * 0.12;

    ctx.save();

    ctx.translate(centerX, centerY);

    ctx.rotate(-0.35 + movement);

    ctx.beginPath();

    ctx.ellipse(

      0,

      0,

      radius * 1.45,

      radius * 0.45,

      0,

      0,

      Math.PI * 2

    );

    ctx.strokeStyle =
      "rgba(0,224,191,0.25)";

    ctx.lineWidth = 1;

    ctx.stroke();

    ctx.restore();


    ctx.save();

    ctx.translate(centerX, centerY);

    ctx.rotate(0.9 - movement);

    ctx.beginPath();

    ctx.ellipse(

      0,

      0,

      radius * 1.35,

      radius * 0.55,

      0,

      0,

      Math.PI * 2

    );

    ctx.strokeStyle =
      "rgba(229,0,135,0.18)";

    ctx.lineWidth = 0.8;

    ctx.stroke();

    ctx.restore();

  }


  /* DRAW THE COMPLETE GLOBE SCENE */

  function drawScene(time) {

    if (!width || !height || !radius) return;

    ctx.clearRect(

      0,

      0,

      width,

      height

    );

    drawStars(time);

    drawGlobeGlow();

    drawOrbits(time);

    const projectedPoints =

      projectPoints(rotationAngle);

    drawConnections(projectedPoints);

    drawNodes(projectedPoints);

  }


  /* ANIMATION LOOP */

  function animateGlobe(timestamp) {

    animationFrame = null;

    if (
      !globeVisible ||
      document.hidden ||
      reducedMotion
    ) {

      lastTimestamp = 0;

      return;

    }

    const delta = lastTimestamp

      ? Math.min(timestamp - lastTimestamp, 50)

      : 0;

    lastTimestamp = timestamp;

    rotationAngle += delta * 0.00015;

    drawScene(timestamp);

    animationFrame =

      requestAnimationFrame(animateGlobe);

  }


  /* START AND STOP ANIMATION */

  function startGlobe() {

    if (reducedMotion) {

      drawScene(0);

      return;

    }

    if (
      animationFrame === null &&
      globeVisible &&
      !document.hidden
    ) {

      lastTimestamp = 0;

      animationFrame =

        requestAnimationFrame(animateGlobe);

    }

  }

  function stopGlobe() {

    if (animationFrame !== null) {

      cancelAnimationFrame(animationFrame);

      animationFrame = null;

    }

    lastTimestamp = 0;

  }


  /* PAUSE GLOBE WHEN OUTSIDE VIEWPORT */

  if ("IntersectionObserver" in window) {

    const globeObserver = new IntersectionObserver(

      function (entries) {

        entries.forEach(function (entry) {

          globeVisible = entry.isIntersecting;

          if (globeVisible) {

            startGlobe();

          } else {

            stopGlobe();

          }

        });

      },

      {
        threshold: 0
      }

    );

    globeObserver.observe(canvas);

  }


  /* PAUSE GLOBE WHEN TAB IS INACTIVE */

  document.addEventListener(

    "visibilitychange",

    function () {

      if (document.hidden) {

        stopGlobe();

      } else {

        startGlobe();

      }

    }

  );


  /* RESPONSIVE RESIZING */

  let resizeFrame = null;

  window.addEventListener(

    "resize",

    function () {

      if (resizeFrame !== null) {

        cancelAnimationFrame(resizeFrame);

      }

      resizeFrame = requestAnimationFrame(

        function () {

          resizeCanvas();

          drawScene(performance.now());

          resizeFrame = null;

        }

      );

    }

  );


  /* INITIALIZE GLOBE */

  resizeCanvas();

  drawScene(0);

  startGlobe();

});

/* ==================================================
   END OF LEARN37 JAVASCRIPT
   ================================================== */
