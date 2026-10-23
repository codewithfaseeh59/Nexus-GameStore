(function () {
  const TAX_RATE = 0.08;
  const cart = window.NexusCart;
  const list = document.getElementById("cartList");

  function formatMoney(value) {
    return "$" + value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  function escapeHtml(text) {
    return String(text).replace(/[&<>"']/g, char => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[char]));
  }

  function itemHtml(item) {
    const name = escapeHtml(item.name);

    return `
      <div class="cart-item" data-id="${escapeHtml(item.id)}">
        <div class="cart-item-product">
          <div class="cart-item-img">
            <img alt="${name}" width="800" height="533" src="${escapeHtml(item.img)}">
          </div>
          <div class="cart-item-details">
            <span class="cart-item-tag">${escapeHtml(item.tag)}</span>
            <h2 class="cart-item-name">${name}</h2>
          </div>
        </div>
        <p class="cart-item-price">${formatMoney(item.price)}</p>
        <div class="cart-item-qty">
          <div class="qty-selector">
            <button class="qty-btn cart-qty-minus" aria-label="Decrease quantity">−</button>
            <span class="qty-value">${item.qty}</span>
            <button class="qty-btn cart-qty-plus" aria-label="Increase quantity">+</button>
          </div>
        </div>
        <p class="cart-item-subtotal">${formatMoney(item.price * item.qty)}</p>
        <button class="cart-item-remove" aria-label="Remove ${name}">
          <i class="fas fa-times"></i>
        </button>
      </div>
    `;
  }

  function setMoney(el, value) {
    if (!el) return;

    const from = parseFloat(el.dataset.value) || 0;
    el.dataset.value = value;

    if (reduceMotion) {
      el.textContent = formatMoney(value);
      return;
    }

    const state = { value: from };
    gsap.to(state, {
      value: value,
      duration: 0.4,
      ease: "power2.out",
      overwrite: true,
      onUpdate: () => { el.textContent = formatMoney(state.value); },
      onComplete: () => { el.textContent = formatMoney(value); }
    });
  }

  function updateSummary() {
    const subtotal = cart.subtotal();
    const tax = subtotal * TAX_RATE;

    setMoney(document.getElementById("summarySubtotal"), subtotal);
    setMoney(document.getElementById("summaryTax"), tax);
    setMoney(document.getElementById("summaryTotal"), subtotal + tax);
  }

  function toggleCartChrome(hasItems) {
    document.querySelector(".cart-table-head").style.display = hasItems ? "" : "none";
    document.querySelector(".cart-coupon").style.display = hasItems ? "" : "none";
    document.querySelector(".cart-summary").style.opacity = hasItems ? "" : "0.4";
    document.querySelector(".checkout-btn").setAttribute("aria-disabled", hasItems ? "false" : "true");
  }

  function showEmptyCart() {
    list.innerHTML = `
      <div class="cart-empty">
        <i class="fas fa-shopping-bag"></i>
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added anything yet.</p>
        <a href="shop.html" class="btn-primary">Start Shopping</a>
      </div>
    `;
    toggleCartChrome(false);
  }

  function renderCart() {
    const items = cart.items();

    if (!items.length) {
      showEmptyCart();
    } else {
      list.innerHTML = items.map(itemHtml).join("");
      toggleCartChrome(true);
    }

    updateSummary();
  }

  function changeQuantity(row, delta) {
    const id = row.dataset.id;
    const item = cart.items().find(entry => entry.id === id);
    if (!item) return;

    const qty = item.qty + delta;
    if (qty < 1) return;

    cart.setQty(id, qty);

    const qtyEl = row.querySelector(".qty-value");
    if (!reduceMotion) {
      gsap.from(qtyEl, { y: -6, opacity: 0, duration: 0.2, ease: "power2.out" });
    }
    qtyEl.textContent = qty;
    row.querySelector(".cart-item-subtotal").textContent = formatMoney(item.price * qty);
    updateSummary();
  }

  function removeRow(row) {
    const finish = () => {
      cart.remove(row.dataset.id);
      row.remove();
      updateSummary();

      if (!cart.items().length) showEmptyCart();
    };

    if (reduceMotion) {
      finish();
      return;
    }

    gsap.to(row, {
      opacity: 0,
      x: -30,
      height: 0,
      paddingTop: 0,
      paddingBottom: 0,
      duration: 0.4,
      ease: "power2.in",
      onComplete: finish
    });
  }

  function initCartActions() {
    list.addEventListener("click", event => {
      const row = event.target.closest(".cart-item");
      if (!row) return;

      if (event.target.closest(".cart-qty-plus")) changeQuantity(row, 1);
      else if (event.target.closest(".cart-qty-minus")) changeQuantity(row, -1);
      else if (event.target.closest(".cart-item-remove")) removeRow(row);
    });
  }

  function initCheckout() {
    const button = document.querySelector(".checkout-btn");
    const note = document.getElementById("checkoutNote");

    const showNote = () => {
      note.textContent = cart.count()
        ? "This is a demo store, so checkout is not enabled. Nothing has been charged."
        : "Add something to your cart first.";
    };

    button.addEventListener("click", showNote);
    button.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        showNote();
      }
    });
  }

  function initCoupon() {
    const couponInput = document.querySelector(".cart-coupon input");
    const couponBtn = document.querySelector(".cart-coupon .btn-primary");

    if (!couponBtn) return;

    couponBtn.addEventListener("click", () => {
      const code = couponInput.value.trim().toUpperCase();

      if (code === "NEXUS10") {
        couponBtn.textContent = "Applied!";
        couponBtn.style.background = "#1a1a2e";
        couponInput.style.borderColor = "#7b2fff";
        couponInput.disabled = true;
        couponBtn.disabled = true;
      } else {
        if (!reduceMotion) {
          gsap.to(couponInput, {
            x: -6,
            duration: 0.05,
            yoyo: true,
            repeat: 5,
            ease: "none"
          });
        }
        couponInput.style.borderColor = "#ff4444";
        setTimeout(() => {
          couponInput.style.borderColor = "";
        }, 1000);
      }
    });
  }

  function initCartReveal() {
    if (reduceMotion) return;

    gsap.from(".cart-heading", {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power3.out",
      delay: 0.2
    });

    gsap.from(".cart-item", {
      opacity: 0,
      y: 30,
      duration: 0.6,
      ease: "power3.out",
      stagger: 0.1,
      delay: 0.3
    });

    gsap.from(".cart-summary", {
      opacity: 0,
      x: 30,
      duration: 0.8,
      ease: "power3.out",
      delay: 0.4
    });
  }

  renderCart();
  initCartActions();
  initCheckout();
  initCoupon();
  initCartReveal();
})();
