
/* ==================================================
   LEARN37 — COMPLETE JAVASCRIPT
   ================================================== */

document.addEventListener("DOMContentLoaded", function () {

  "use strict";

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;


  /* ==================================================
     MOBILE NAVIGATION
     ================================================== */

  const menu = document.getElementById("menu");
  const links = document.getElementById("links");

  function closeMenu() {

    if (!menu || !links) return;

    links.classList.remove("active");

    menu.textContent = "☰";

    menu.setAttribute(
      "aria-expanded",
      "false"
    );

  }

  if (menu && links) {

    menu.addEventListener("click", function () {

      const isOpen = links.classList.toggle("active");

      menu.textContent = isOpen ? "✕" : "☰";

      menu.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

    });

    links.querySelectorAll("a").forEach(function (link) {

      link.addEventListener("click", closeMenu);

    });

    document.addEventListener("click", function (event) {

      if (
        !menu.contains(event.target) &&
        !links.contains(event.target)
      ) {

        closeMenu();

      }

    });

    document.addEventListener("keydown", function (event) {

      if (event.key === "Escape") {

        closeMenu();

      }

    });

    window.addEventListener("resize", function () {

      if (window.innerWidth > 900) {

        closeMenu();

      }

    });

  }


  /* ==================================================
     EVENT COUNTDOWN
     ================================================== */

  const countdown = document.getElementById("countdown");

  const countdownLabel = document.getElementById(
    "countdownLabel"
  );

  const eventStart = new Date(
    "2026-11-30T08:30:00+05:30"
  ).getTime();

  const eventEnd = new Date(
    "2026-12-02T00:00:00+05:30"
  ).getTime();

  let countdownInterval = null;

  function padNumber(number) {

    return String(number).padStart(2, "0");

  }

  if (countdown) {

    countdown.innerHTML = `
      <div class="countdown-item">
        <strong id="days">00</strong>
        <small>Days</small>
      </div>

      <div class="countdown-item">
        <strong id="hours">00</strong>
        <small>Hours</small>
      </div>

      <div class="countdown-item">
        <strong id="minutes">00</strong>
        <small>Minutes</small>
      </div>

      <div class="countdown-item">
        <strong id="seconds">00</strong>
        <small>Seconds</small>
      </div>
    `;

  }

  function updateCountdown() {

    if (!countdown) return;

    const now = Date.now();

    const difference = eventStart - now;

    if (difference <= 0) {

      countdown.hidden = true;

      if (countdownLabel) {

        countdownLabel.textContent =
          now < eventEnd
            ? "WELCOME TO LEARN37"
            : "THANK YOU FOR BEING PART OF LEARN37";

      }

      if (countdownInterval !== null) {

        clearInterval(countdownInterval);

      }

      return;

    }

    const days = Math.floor(
      difference / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
      (difference / (1000 * 60 * 60)) % 24
    );

    const minutes = Math.floor(
      (difference / (1000 * 60)) % 60
    );

    const seconds = Math.floor(
      (difference / 1000) % 60
    );

    document.getElementById("days").textContent =
      padNumber(days);

    document.getElementById("hours").textContent =
      padNumber(hours);

    document.getElementById("minutes").textContent =
      padNumber(minutes);

    document.getElementById("seconds").textContent =
      padNumber(seconds);

  }

  if (countdown) {

    updateCountdown();

    if (Date.now() < eventStart) {

      countdownInterval = setInterval(
        updateCountdown,
        1000
      );

    }

  }


  /* ==================================================
     EQUAL-HEIGHT PARALLEL AGENDA SESSIONS
     ================================================== */

  function alignAgendaRows() {

    const day1 = document.getElementById("day1");

    if (!day1 || day1.hidden) return;

    const rows = day1.querySelectorAll(
      ".agenda-table tbody tr"
    );

    rows.forEach(function (row) {

      const sessions = Array.from(
        row.querySelectorAll(".network-session")
      );

      if (!sessions.length) return;

      sessions.forEach(function (session) {

        session.style.height = "auto";

      });

      const maximumHeight = Math.max(

        ...sessions.map(function (session) {

          return session.getBoundingClientRect().height;

        })

      );

      if (maximumHeight > 0) {

        sessions.forEach(function (session) {

          session.style.height =
            Math.ceil(maximumHeight) + "px";

        });

      }

    });

  }

  alignAgendaRows();

  window.addEventListener(
    "load",
    alignAgendaRows
  );

  if (document.fonts && document.fonts.ready) {

    document.fonts.ready.then(
      alignAgendaRows
    );

  }


  /* ==================================================
     PROGRAMME DAY TABS
     ================================================== */

  const tabButtons = document.querySelectorAll(
    ".tabs button[data-day]"
  );

  const schedules = document.querySelectorAll(
    ".schedule"
  );

  tabButtons.forEach(function (button) {

    button.addEventListener("click", function () {

      const selectedDay = button.dataset.day;

      tabButtons.forEach(function (item) {

        item.setAttribute(
          "aria-pressed",
          String(item === button)
        );

      });

      schedules.forEach(function (schedule) {

        schedule.hidden =
          schedule.id !== selectedDay;

      });

      requestAnimationFrame(function () {

        alignAgendaRows();

      });

    });

  });


  /* ==================================================
     SCROLL REVEAL ANIMATIONS
     ================================================== */

  const revealElements = document.querySelectorAll(
    ".reveal"
  );

  const agendaElements = document.querySelectorAll(

    ".agenda-table tbody tr, " +
    ".d2-row, " +
    ".agenda-awards, " +
    ".d2-note"

  );

  if (
    !reducedMotion &&
    "IntersectionObserver" in window
  ) {

    document.body.classList.add("js-ready");

    document.querySelectorAll(".pn-row")
      .forEach(function (row, index) {

        row.style.setProperty(
          "--reveal-delay",
          (index % 3) * 130 + "ms"
        );

      });

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

    agendaElements.forEach(function (element, index) {

      element.classList.add("agenda-enter");

      element.style.setProperty(
        "--agenda-delay",
        (index % 4) * 75 + "ms"
      );

      revealObserver.observe(element);

    });

  } else {

    revealElements.forEach(function (element) {

      element.classList.add("visible");

    });

    agendaElements.forEach(function (element) {

      element.classList.add("visible");

    });

  }


  /* ==================================================
     PAUSE OFFSCREEN ANIMATIONS
     ================================================== */

  const animatedSections = document.querySelectorAll(
    ".pn-section, .programme-section"
  );

  const sectionVisibility = new Map();

  function updateSectionAnimations() {

    animatedSections.forEach(function (section) {

      const shouldPause =
        !sectionVisibility.get(section) ||
        document.hidden;

      section.classList.toggle(
        "animation-paused",
        shouldPause
      );

    });

  }

  if ("IntersectionObserver" in window) {

    const sectionObserver = new IntersectionObserver(

      function (entries) {

        entries.forEach(function (entry) {

          sectionVisibility.set(
            entry.target,
            entry.isIntersecting
          );

        });

        updateSectionAnimations();

      },

      {
        threshold: 0
      }

    );

    animatedSections.forEach(function (section) {

      sectionVisibility.set(section, false);

      sectionObserver.observe(section);

    });

    document.addEventListener(
      "visibilitychange",
      updateSectionAnimations
    );

  }


  /* ==================================================
     ACTIVE NAVIGATION LINK
     ================================================== */

  const sections = Array.from(
    document.querySelectorAll("main section[id]")
  );

  const navigationLinks = document.querySelectorAll(
    '#links a[href^="#"]'
  );

  let scrollFrame = null;

  function updateActiveNavigation() {

    let currentSection = "home";

    sections.forEach(function (section) {

      if (section.getBoundingClientRect().top <= 180) {

        currentSection = section.id;

      }

    });

    navigationLinks.forEach(function (link) {

      const isActive =
        link.getAttribute("href") ===
        "#" + currentSection;

      link.classList.toggle(
        "active",
        isActive
      );

      if (isActive) {

        link.setAttribute(
          "aria-current",
          "location"
        );

      } else {

        link.removeAttribute("aria-current");

      }

    });

  }

  window.addEventListener(

    "scroll",

    function () {

      if (scrollFrame !== null) return;

      scrollFrame = requestAnimationFrame(function () {

        updateActiveNavigation();

        scrollFrame = null;

      });

    },

    {
      passive: true
    }

  );

  updateActiveNavigation();


  /* ==================================================
     ANIMATED 3D NETWORK GLOBE
     ================================================== */

  const canvas = document.getElementById("network");

  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  if (!ctx) return;

  let width = 0;
  let height = 0;

  let centerX = 0;
  let centerY = 0;

  let radius = 0;

  let rotation = 0.5;

  let animationFrame = null;

  let lastTime = 0;

  let globeVisible = true;

  let resizeFrame = null;


  /* CREATE SPHERE POINTS */

  const points = [];

  const pointCount = 160;

  const goldenAngle =
    Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < pointCount; i++) {

    const y =
      1 - (i / (pointCount - 1)) * 2;

    const distance =
      Math.sqrt(1 - y * y);

    const theta =
      goldenAngle * i;

    points.push({

      x: Math.cos(theta) * distance,

      y: y,

      z: Math.sin(theta) * distance

    });

  }


  /* BACKGROUND STARS */

  const stars = Array.from(

    {
      length: 75
    },

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


  /* RESIZE CANVAS */

  function resizeCanvas() {

    const bounds = canvas.getBoundingClientRect();

    width = bounds.width;
    height = bounds.height;

    const dpr = Math.min(
      window.devicePixelRatio || 1,
      2
    );

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

    drawScene(performance.now());

  }


  /* PROJECT 3D SPHERE POINTS */

  function projectPoint(point) {

    const cos = Math.cos(rotation);
    const sin = Math.sin(rotation);

    const x =
      point.x * cos -
      point.z * sin;

    const z =
      point.x * sin +
      point.z * cos;

    const tilt = 0.2;

    const tiltedY =
      point.y * Math.cos(tilt) -
      z * Math.sin(tilt);

    const tiltedZ =
      point.y * Math.sin(tilt) +
      z * Math.cos(tilt);

    const scale =
      3 / (3 - tiltedZ);

    return {

      x: centerX + x * radius * scale,

      y: centerY + tiltedY * radius * scale,

      z: tiltedZ,

      scale: scale

    };

  }


  /* DRAW STARS */

  function drawStars(time) {

    stars.forEach(function (star) {

      const pulse = reducedMotion

        ? 0.85

        : 0.75 +
          Math.sin(
            time * 0.001 + star.phase
          ) * 0.25;

      const opacity =
        star.opacity * pulse;

      ctx.beginPath();

      ctx.arc(

        star.x * width,

        star.y * height,

        star.size,

        0,

        Math.PI * 2

      );

      ctx.fillStyle =
        `rgba(170, 235, 255, ${opacity})`;

      ctx.fill();

    });

  }


  /* DRAW GLOBE GLOW */

  function drawGlow() {

    const glow = ctx.createRadialGradient(

      centerX,

      centerY,

      radius * 0.2,

      centerX,

      centerY,

      radius * 1.7

    );

    glow.addColorStop(
      0,
      "rgba(0, 187, 199, 0.15)"
    );

    glow.addColorStop(
      0.5,
      "rgba(0, 149, 202, 0.07)"
    );

    glow.addColorStop(
      1,
      "rgba(0, 149, 202, 0)"
    );

    ctx.fillStyle = glow;

    ctx.fillRect(
      0,
      0,
      width,
      height
    );

  }


  /* DRAW NETWORK CONNECTIONS */

  function drawConnections(projected) {

    const maxDistance = radius * 0.32;

    for (let i = 0; i < projected.length; i++) {

      const a = projected[i];

      if (a.z < -0.25) continue;

      for (
        let j = i + 1;
        j < projected.length;
        j++
      ) {

        const b = projected[j];

        if (b.z < -0.25) continue;

        const dx = a.x - b.x;

        const dy = a.y - b.y;

        const distance =
          Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDistance) {

          const opacity =
            0.5 * (1 - distance / maxDistance);

          ctx.beginPath();

          ctx.moveTo(a.x, a.y);

          ctx.lineTo(b.x, b.y);

          ctx.strokeStyle =
            `rgba(0, 220, 255, ${opacity})`;

          ctx.lineWidth = 0.8;

          ctx.stroke();

        }

      }

    }

  }


  /* DRAW NETWORK NODES */

  function drawNodes(projected) {

    const sorted = projected.slice().sort(

      function (a, b) {

        return a.z - b.z;

      }

    );

    sorted.forEach(function (point) {

      const opacity =
        0.2 + 0.8 * ((point.z + 1) / 2);

      const size =
        1.5 * point.scale;

      ctx.beginPath();

      ctx.arc(

        point.x,

        point.y,

        size,

        0,

        Math.PI * 2

      );

      ctx.fillStyle =
        `rgba(100, 245, 255, ${opacity})`;

      ctx.fill();

      if (point.z > 0.75) {

        ctx.beginPath();

        ctx.arc(

          point.x,

          point.y,

          size * 2.5,

          0,

          Math.PI * 2

        );

        ctx.fillStyle =
          "rgba(0, 224, 255, 0.08)";

        ctx.fill();

      }

    });

  }


  /* DRAW ORBITAL RINGS */

  function drawOrbits() {

    ctx.save();

    ctx.translate(
      centerX,
      centerY
    );

    ctx.rotate(-0.35);

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
      "rgba(0, 224, 191, 0.35)";

    ctx.lineWidth = 1;

    ctx.stroke();

    ctx.restore();


    ctx.save();

    ctx.translate(
      centerX,
      centerY
    );

    ctx.rotate(0.9);

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
      "rgba(229, 0, 135, 0.22)";

    ctx.lineWidth = 1;

    ctx.stroke();

    ctx.restore();

  }


  /* DRAW COMPLETE SCENE */

  function drawScene(time) {

    if (!width || !height) return;

    ctx.clearRect(
      0,
      0,
      width,
      height
    );

    drawStars(time);

    drawGlow();

    const projected =
      points.map(projectPoint);

    drawConnections(projected);

    drawOrbits();

    drawNodes(projected);

  }


  /* ANIMATION LOOP */

  function animate(time) {

    if (
      reducedMotion ||
      document.hidden ||
      !globeVisible
    ) {

      animationFrame = null;

      return;

    }

    const delta = lastTime

      ? Math.min(time - lastTime, 50)

      : 16;

    lastTime = time;

    rotation += delta * 0.00015;

    drawScene(time);

    animationFrame =
      requestAnimationFrame(animate);

  }


  /* START AND STOP ANIMATION */

  function startAnimation() {

    if (
      reducedMotion ||
      document.hidden ||
      !globeVisible ||
      animationFrame !== null
    ) {

      return;

    }

    lastTime = 0;

    animationFrame =
      requestAnimationFrame(animate);

  }

  function stopAnimation() {

    if (animationFrame !== null) {

      cancelAnimationFrame(animationFrame);

      animationFrame = null;

    }

  }


  /* PAUSE GLOBE WHEN NOT VISIBLE */

  if ("IntersectionObserver" in window) {

    const globeObserver = new IntersectionObserver(

      function (entries) {

        entries.forEach(function (entry) {

          globeVisible = entry.isIntersecting;

          if (globeVisible) {

            startAnimation();

          } else {

            stopAnimation();

          }

        });

      },

      {
        threshold: 0
      }

    );

    globeObserver.observe(canvas);

  }


  /* PAUSE WHEN BROWSER TAB IS HIDDEN */

  document.addEventListener(

    "visibilitychange",

    function () {

      if (document.hidden) {

        stopAnimation();

      } else {

        updateCountdown();

        startAnimation();

      }

    }

  );


  /* RESPONSIVE RESIZE */

  window.addEventListener("resize", function () {

    if (resizeFrame !== null) {

      cancelAnimationFrame(resizeFrame);

    }

    resizeFrame = requestAnimationFrame(function () {

      resizeCanvas();

      alignAgendaRows();

      resizeFrame = null;

    });

  });


  /* INITIALISE GLOBE */

  resizeCanvas();

  if (!reducedMotion) {

    startAnimation();

  }

});

/* ==================================================
   END OF LEARN37 JAVASCRIPT
   ================================================== */
