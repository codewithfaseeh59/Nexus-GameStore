const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const useCustomCursor = !reduceMotion && !window.matchMedia("(hover: none)").matches;

if (!useCustomCursor) document.documentElement.classList.add("native-cursor");


function initLocoScroll() {
  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#wrapper"),
    smooth: true,
    multiplier: 0.9,
    class: "is-inview"
  });

  locoScroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy("#wrapper", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0, left: 0,
        width: window.innerWidth,
        height: window.innerHeight
      };
    },
    pinType: document.querySelector("#wrapper").style.transform
      ? "transform"
      : "fixed"
  });

  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.refresh();

  return locoScroll;
}

const SHERY_VERSION = "1.0.0-beta.0.1.8";

function loadShery() {
  return new Promise(resolve => {
    const base = "https://unpkg.com/sheryjs@" + SHERY_VERSION + "/dist/Shery";

    const style = document.createElement("link");
    style.rel = "stylesheet";
    style.href = base + ".css";
    // Must precede the site stylesheets so main.css keeps overriding its global rules
    document.head.insertBefore(style, document.head.querySelector("link[rel=stylesheet]"));

    const script = document.createElement("script");
    script.src = base + ".js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.head.appendChild(script);
  });
}

function initCursorEffects() {
  if (!useCustomCursor) return;

  loadShery().then(loaded => {
    if (!loaded) {
      document.documentElement.classList.add("native-cursor");
      return;
    }

    Shery.mouseFollower({
      skewAmount: 5,
      ease: "cubic-bezier(0.23, 1, 0.32, 1)",
      duration: 1,
    });

    Shery.makeMagnet(".btn-primary, .btn-ghost, .nav-logo, .nav-cart", {
      ease: "cubic-bezier(0.23, 1, 0.32, 1)",
      duration: 1,
    });
  });
}

function initNavbar(locoScroll) {
  const navbar = document.getElementById("navbar");
  let lastScroll = 0;
  let isNavVisible = true;

  locoScroll.on("scroll", ({ scroll }) => {
    const current = scroll.y;

    navbar.classList.toggle("scrolled", current > 60);

    if (current > lastScroll && current > 100) {
      if (isNavVisible) {
        gsap.to(navbar, {
          yPercent: -100,
          duration: 0.4,
          ease: "power2.inOut"
        });
        isNavVisible = false;
      }
    } else {
      if (!isNavVisible) {
        gsap.to(navbar, {
          yPercent: 0,
          duration: 0.4,
          ease: "power2.inOut"
        });
        isNavVisible = true;
      }
    }

    lastScroll = current;
  });
}

function initSearch() {
  const searchIcon = document.querySelector(".search-icon");
  const navSearch = document.querySelector(".nav-search");

  if (!searchIcon) return;

  searchIcon.addEventListener("click", () => {
    navSearch.classList.toggle("open");
  });
}

function initMobileMenu() {
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileOverlay = document.getElementById("mobileOverlay");

  if (!hamburger) return;

  const openMenu = () => {
    hamburger.classList.add("open");
    hamburger.setAttribute("aria-expanded", "true");
    hamburger.setAttribute("aria-label", "Close menu");
    mobileMenu.classList.add("open");
    mobileOverlay.classList.add("open");
    document.body.style.overflow = "hidden";
  };

  const closeMenu = () => {
    hamburger.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
    hamburger.setAttribute("aria-label", "Open menu");
    mobileMenu.classList.remove("open");
    mobileOverlay.classList.remove("open");
    document.body.style.overflow = "";
  };

  hamburger.addEventListener("click", () => {
    hamburger.classList.contains("open") ? closeMenu() : openMenu();
  });

  mobileOverlay.addEventListener("click", closeMenu);
}

function initHeroAnimations() {
  if (reduceMotion) return;
  const heroElements = [
    ".hero-tagline",
    ".hero-heading",
    ".hero-sub",
    ".hero-btns",
    ".hero-visual",
    ".hero-scroll"
  ];

  gsap.set(heroElements, { opacity: 0, y: 40 });

  gsap.timeline({ delay: 0.3 })
    .to(".hero-tagline", {
      opacity: 1, y: 0,
      duration: 0.8,
      ease: "power3.out"
    })
    .to(".hero-heading", {
      opacity: 1, y: 0,
      duration: 1,
      ease: "power3.out"
    }, "-=0.4")
    .to(".hero-sub", {
      opacity: 1, y: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.6")
    .to(".hero-btns", {
      opacity: 1, y: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.6")
    .to(".hero-visual", {
      opacity: 1, y: 0,
      duration: 1,
      ease: "power3.out"
    }, "-=0.6")
    .to(".hero-scroll", {
      opacity: 1, y: 0,
      duration: 0.6,
      ease: "power3.out"
    }, "-=0.4");
}

function initStatsCounter() {
  const counts = document.querySelectorAll(".count");
  if (!counts.length) return;

  if (reduceMotion) {
    counts.forEach(count => {
      const target = parseFloat(count.getAttribute("data-target"));
      count.innerText = target % 1 !== 0 ? target.toFixed(1) : target.toLocaleString();
    });
    return;
  }

  counts.forEach(count => {
    const target = parseFloat(count.getAttribute("data-target"));
    const isDecimal = target % 1 !== 0;

    ScrollTrigger.create({
      trigger: "#stats",
      scroller: "#wrapper",
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.to(count, {
          innerText: target,
          duration: 2,
          ease: "power2.out",
          snap: isDecimal ? { innerText: 0.1 } : { innerText: 1 },
          onUpdate: function () {
            count.innerText = isDecimal
              ? parseFloat(count.innerText).toFixed(1)
              : Math.floor(count.innerText).toLocaleString();
          }
        });
      }
    });
  });
}

function initScrollReveals() {
  if (reduceMotion) return;
  const revealElements = [
    { selector: "#stats .stat-item", stagger: 0.15 },
    { selector: ".categories-header", stagger: 0 },
    { selector: ".fp-header", stagger: 0 },
    { selector: ".fp-filters", stagger: 0 },
    { selector: ".prod-card", stagger: 0.1 },
    { selector: ".bp-content", stagger: 0 },
  ];

  revealElements.forEach(({ selector, stagger }) => {
    const el = document.querySelector(selector);
    if (!el) return;

    gsap.from(selector, {
      opacity: 0,
      y: 50,
      duration: 0.9,
      ease: "power3.out",
      stagger: stagger,
      scrollTrigger: {
        trigger: selector,
        scroller: "#wrapper",
        start: "top 85%",
        once: true,
      }
    });
  });
}

function initHorizontalScroll() {
  const track = document.querySelector(".categories-track");
  if (!track) return;

  const getScrollAmount = () => {
    return -(track.scrollWidth - window.innerWidth + 120);
  };

  gsap.to(track, {
    x: getScrollAmount,
    ease: "none",
    scrollTrigger: {
      trigger: "#categories",
      scroller: "#wrapper",
      start: "top top",
      end: () => `+=${Math.abs(getScrollAmount())}`,
      pin: true,
      scrub: reduceMotion ? true : 1,
      invalidateOnRefresh: true,
    }
  });
}

function initProductFilter(locoScroll) {
  const filterBtns = document.querySelectorAll(".fp-filter");
  const prodCards = document.querySelectorAll(".prod-card");

  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      prodCards.forEach(card => {
        const category = card.getAttribute("data-category");
        const match = filter === "all" || category === filter;

        if (match) {
          gsap.to(card, {
            opacity: 1,
            scale: 1,
            duration: reduceMotion ? 0 : 0.4,
            ease: "power2.out",
            display: "block"
          });
        } else {
          gsap.to(card, {
            opacity: 0,
            scale: 0.95,
            duration: reduceMotion ? 0 : 0.3,
            ease: "power2.in",
            display: "none"
          });
        }
      });

      setTimeout(() => {
        locoScroll.update();
        ScrollTrigger.refresh();
      }, 400);
    });
  });
}


function waitForCriticalAssets(maxWait) {
  const criticalImages = Array.from(
    document.querySelectorAll("#hero img, .shop-banner-img, .product-main-img img")
  ).filter(img => img.loading !== "lazy" && !img.complete);

  const imagesReady = Promise.all(
    criticalImages.map(img => new Promise(resolve => {
      img.addEventListener("load", resolve, { once: true });
      img.addEventListener("error", resolve, { once: true });
    }))
  );
  const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();
  const timeout = new Promise(resolve => setTimeout(resolve, maxWait));

  return Promise.race([Promise.all([imagesReady, fontsReady]), timeout]);
}

function initLoader(onComplete) {
  const loader = document.getElementById("loader");
  if (!loader) {
    onComplete();
    return;
  }

  if (reduceMotion) {
    loader.style.display = "none";
    onComplete();
    return;
  }

  const progressBar = document.querySelector(".loader-progress-bar");
  const percent = document.querySelector(".loader-percent");
  const splitTop = document.querySelector(".loader-split-top");
  const splitBottom = document.querySelector(".loader-split-bottom");

  let assetsReady = false;
  waitForCriticalAssets(1200).then(() => { assetsReady = true; });

  const finish = () => {
    gsap.timeline({ onComplete: () => {
      loader.style.display = "none";
      onComplete();
    } })
      .to(".loader-content", {
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
      })
      .to(splitTop, { translateY: "0%", duration: 0.3, ease: "power4.inOut" }, "-=0.1")
      .to(splitBottom, { translateY: "0%", duration: 0.3, ease: "power4.inOut" }, "<")
      .to(splitTop, { translateY: "-100%", duration: 0.4, ease: "power4.inOut" })
      .to(splitBottom, { translateY: "100%", duration: 0.4, ease: "power4.inOut" }, "<");
  };

  const state = { value: 0 };
  const setProgress = () => {
    const p = Math.round(state.value * 100);
    progressBar.style.transform = "scaleX(" + state.value + ")";
    percent.textContent = p + "%";
  };

  gsap.timeline()
    .to(state, {
      value: 0.9,
      duration: 0.6,
      ease: "power1.out",
      onUpdate: setProgress,
    })
    .add(() => {
      const complete = () => {
        gsap.to(state, {
          value: 1,
          duration: 0.15,
          ease: "none",
          onUpdate: setProgress,
          onComplete: finish,
        });
      };
      if (assetsReady) {
        complete();
      } else {
        waitForCriticalAssets(300).then(complete);
      }
    });
}


function init() {
  if (!window.gsap || !window.ScrollTrigger || !window.LocomotiveScroll) {
    const loader = document.getElementById("loader");
    if (loader) loader.style.display = "none";
    return;
  }

  initLoader(() => {
    const locoScroll = initLocoScroll();
    initCursorEffects();
    initNavbar(locoScroll);
    initSearch();
    initMobileMenu();
    initHeroAnimations();
    initStatsCounter();
    initScrollReveals();
    initHorizontalScroll();
    initProductFilter(locoScroll);
  });
}

init();