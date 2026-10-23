(function () {
  const STORAGE_KEY = "nexus_cart";
  const IMAGE_PATH = /^\.\/Assets\/Images\/[\w-]+\.(webp|jpg)$/;
  let memoryCart = [];

  function sanitize(list) {
    if (!Array.isArray(list)) return [];

    return list
      .map(item => ({
        id: String(item.id || ""),
        name: String(item.name || ""),
        tag: String(item.tag || ""),
        price: Number(item.price),
        qty: Math.floor(Number(item.qty)),
        img: IMAGE_PATH.test(item.img) ? item.img : "./Assets/Images/prod-1.webp"
      }))
      .filter(item => item.id && item.name && item.price >= 0 && item.qty >= 1);
  }

  function read() {
    try {
      return sanitize(JSON.parse(localStorage.getItem(STORAGE_KEY)));
    } catch (e) {
      return memoryCart;
    }
  }

  function write(items) {
    memoryCart = items;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      /* storage blocked: the in-memory copy keeps the cart working for this page */
    }
    updateBadge(false);
  }

  function slugify(text) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  function count() {
    return read().reduce((sum, item) => sum + item.qty, 0);
  }

  function subtotal() {
    return read().reduce((sum, item) => sum + item.price * item.qty, 0);
  }

  function add(product, qty) {
    const items = read();
    const existing = items.find(item => item.id === product.id);

    if (existing) {
      existing.qty += qty;
    } else {
      items.push(Object.assign({}, product, { qty: qty }));
    }

    write(items);
    updateBadge(true);
  }

  function setQty(id, qty) {
    const items = read();
    const item = items.find(entry => entry.id === id);
    if (!item) return;

    item.qty = Math.max(1, qty);
    write(items);
  }

  function remove(id) {
    write(read().filter(item => item.id !== id));
  }

  function updateBadge(animate) {
    const total = count();

    document.querySelectorAll(".cart-count").forEach(badge => {
      badge.textContent = total;

      if (animate && window.gsap && !reduceMotion) {
        gsap.fromTo(badge, { scale: 0 }, { scale: 1, duration: 0.3, ease: "back.out(1.7)" });
      }
    });
  }

  function productFromCard(card) {
    const name = card.querySelector(".prod-name").textContent.trim();
    const tag = card.querySelector(".prod-tag");
    const image = card.querySelector("img");

    return {
      id: slugify(name),
      name: name,
      tag: tag ? tag.textContent.trim() : "",
      price: parseFloat(card.querySelector(".prod-price").textContent.replace(/[^0-9.]/g, "")),
      img: image.getAttribute("src")
    };
  }

  function initAddToCart() {
    document.addEventListener("click", event => {
      const button = event.target.closest(".prod-cart-btn");
      const card = button && button.closest(".prod-card");
      if (!card) return;

      add(productFromCard(card), 1);

      if (!button.dataset.label) button.dataset.label = button.textContent;
      button.textContent = "Added ✓";
      clearTimeout(button.labelTimer);
      button.labelTimer = setTimeout(() => {
        button.textContent = button.dataset.label;
      }, 1500);
    });
  }

  function initFaq() {
    const items = document.querySelectorAll(".faq-list .accordion-item");

    items.forEach(item => {
      const head = item.querySelector(".accordion-head");

      head.addEventListener("click", () => {
        const wasActive = item.classList.contains("active");
        items.forEach(other => {
          other.classList.remove("active");
          other.querySelector(".accordion-head").setAttribute("aria-expanded", "false");
        });

        if (!wasActive) {
          item.classList.add("active");
          head.setAttribute("aria-expanded", "true");
        }
      });
    });
  }

  function initTrackOrder() {
    const form = document.getElementById("trackForm");
    if (!form) return;

    const result = document.getElementById("trackResult");

    form.addEventListener("submit", event => {
      event.preventDefault();

      const orderId = form.elements.order.value.trim().toUpperCase();
      document.getElementById("trackOrderId").textContent = orderId;
      result.hidden = false;
    });
  }

  window.NexusCart = {
    items: read,
    count: count,
    subtotal: subtotal,
    add: add,
    setQty: setQty,
    remove: remove,
    slugify: slugify
  };

  window.addEventListener("storage", event => {
    if (event.key === STORAGE_KEY) updateBadge(false);
  });

  updateBadge(false);
  initAddToCart();
  initFaq();
  initTrackOrder();
})();
