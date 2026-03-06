
function initPriceSlider() {
  const slider = document.getElementById("priceSlider");
  const priceValue = document.getElementById("priceValue");

  if (!slider) return;

  slider.addEventListener("input", () => {
    priceValue.textContent = `$${Number(slider.value).toLocaleString()}`;
    filterProducts();
  });
}

function initCategoryFilter() {
  const checkboxes = document.querySelectorAll(".sidebar-check input[data-category]");

  if (!checkboxes.length) return;

  checkboxes.forEach(checkbox => {
    checkbox.addEventListener("change", () => {
      if (checkbox.dataset.category === "all" && checkbox.checked) {
        checkboxes.forEach(cb => {
          if (cb.dataset.category !== "all") cb.checked = false;
        });
      } else {

        document.querySelector(".sidebar-check input[data-category='all']").checked = false;
      }
      filterProducts();
    });
  });
}

function initSort() {
  const sortSelect = document.getElementById("sortSelect");
  if (!sortSelect) return;

  sortSelect.addEventListener("change", () => {
    sortProducts(sortSelect.value);
  });
}


function filterProducts() {
  const cards = document.querySelectorAll(".shop-grid .prod-card");
  const slider = document.getElementById("priceSlider");
  const maxPrice = slider ? parseInt(slider.value) : 9999;

  const checkedCategories = [];
  document.querySelectorAll(".sidebar-check input[data-category]:checked").forEach(cb => {
    checkedCategories.push(cb.dataset.category);
  });

  const showAll = checkedCategories.includes("all") || checkedCategories.length === 0;

  let visibleCount = 0;

  cards.forEach(card => {
    const category = card.dataset.category;
    const price = parseInt(card.dataset.price);
    const categoryMatch = showAll || checkedCategories.includes(category);
    const priceMatch = price <= maxPrice;

    if (categoryMatch && priceMatch) {
      gsap.to(card, {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
        display: "block"
      });
      visibleCount++;
    } else {
      gsap.to(card, {
        opacity: 0,
        scale: 0.95,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => { card.style.display = "none"; }
      });
    }
  });


  const resultsEl = document.querySelector(".shop-results span:first-child");
  if (resultsEl) resultsEl.textContent = visibleCount;
}


function sortProducts(sortValue) {
  const grid = document.querySelector(".shop-grid");
  const cards = Array.from(grid.querySelectorAll(".prod-card"));

  cards.sort((a, b) => {
    const priceA = parseInt(a.dataset.price);
    const priceB = parseInt(b.dataset.price);
    const ratingA = parseInt(a.dataset.rating);
    const ratingB = parseInt(b.dataset.rating);

    if (sortValue === "price-low") return priceA - priceB;
    if (sortValue === "price-high") return priceB - priceA;
    if (sortValue === "rating") return ratingB - ratingA;
    return 0;
  });

  cards.forEach((card, i) => {
    gsap.to(card, {
      opacity: 0,
      y: 20,
      duration: 0.2,
      delay: i * 0.03,
      onComplete: () => {
        grid.appendChild(card);
        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out"
        });
      }
    });
  });
}


function initLoadMore() {
  const loadMoreBtn = document.querySelector(".load-more-btn");
  if (!loadMoreBtn) return;

  loadMoreBtn.addEventListener("click", () => {

    gsap.to(loadMoreBtn, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      onComplete: () => {

        loadMoreBtn.textContent = "No More Products";
        loadMoreBtn.style.opacity = "0.4";
        loadMoreBtn.style.pointerEvents = "none";
      }
    });
  });
}
function initShopReveal() {
  gsap.from(".shop-banner-content", {
    opacity: 0,
    y: 40,
    duration: 1,
    ease: "power3.out",
    delay: 0.3
  });

  gsap.from(".shop-sidebar", {
    opacity: 0,
    x: -30,
    duration: 0.9,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#shop-layout",
      scroller: "#wrapper",
      start: "top 85%",
      once: true,
    }
  });

  gsap.from(".shop-grid .prod-card", {
    opacity: 0,
    y: 40,
    duration: 0.7,
    ease: "power3.out",
    stagger: 0.08,
    scrollTrigger: {
      trigger: ".shop-grid",
      scroller: "#wrapper",
      start: "top 85%",
      once: true,
    }
  });

  gsap.from(".shop-topbar", {
    opacity: 0,
    y: 20,
    duration: 0.7,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".shop-topbar",
      scroller: "#wrapper",
      start: "top 90%",
      once: true,
    }
  });
}
function initShop() {
  initPriceSlider();
  initCategoryFilter();
  initSort();
  initLoadMore();
  initShopReveal();
}

initShop();