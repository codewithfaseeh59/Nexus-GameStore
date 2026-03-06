
function updateSummary() {
  const items = document.querySelectorAll(".cart-item");
  let subtotal = 0;

  items.forEach(item => {
    const price = parseFloat(item.dataset.price);
    const qty = parseInt(item.querySelector(".qty-value").textContent);
    const itemSubtotal = price * qty;


    item.querySelector(".cart-item-subtotal").textContent =
      `$${itemSubtotal.toFixed(2)}`;

    subtotal += itemSubtotal;
  });

  const tax = subtotal * 0.08;
  const total = subtotal + tax;


  const subtotalEl = document.getElementById("summarySubtotal");
  const taxEl = document.getElementById("summaryTax");
  const totalEl = document.getElementById("summaryTotal");

  if (subtotalEl) {
    gsap.to(subtotalEl, {
      innerText: subtotal,
      duration: 0.4,
      ease: "power2.out",
      snap: { innerText: 0.01 },
      onUpdate: function () {
        subtotalEl.textContent = `$${parseFloat(subtotalEl.textContent).toFixed(2)}`;
      }
    });
  }

  if (taxEl) {
    gsap.to(taxEl, {
      innerText: tax,
      duration: 0.4,
      ease: "power2.out",
      snap: { innerText: 0.01 },
      onUpdate: function () {
        taxEl.textContent = `$${parseFloat(taxEl.textContent).toFixed(2)}`;
      }
    });
  }

  if (totalEl) {
    gsap.to(totalEl, {
      innerText: total,
      duration: 0.4,
      ease: "power2.out",
      snap: { innerText: 0.01 },
      onUpdate: function () {
        totalEl.textContent = `$${parseFloat(totalEl.textContent).toFixed(2)}`;
      }
    });
  }

  const cartCount = document.querySelector(".cart-count");
  if (cartCount) {
    cartCount.textContent = document.querySelectorAll(".cart-item").length;
  }
}


function initCartQuantity() {
  const items = document.querySelectorAll(".cart-item");

  items.forEach(item => {
    const minusBtn = item.querySelector(".cart-qty-minus");
    const plusBtn = item.querySelector(".cart-qty-plus");
    const qtyValue = item.querySelector(".qty-value");

    plusBtn.addEventListener("click", () => {
      let qty = parseInt(qtyValue.textContent);
      qty++;
      animateQty(qtyValue, qty);
      updateSummary();
    });

    minusBtn.addEventListener("click", () => {
      let qty = parseInt(qtyValue.textContent);
      if (qty > 1) {
        qty--;
        animateQty(qtyValue, qty);
        updateSummary();
      }
    });
  });
}

function animateQty(el, value) {
  gsap.from(el, {
    y: -6,
    opacity: 0,
    duration: 0.2,
    ease: "power2.out"
  });
  el.textContent = value;
}


function initRemoveItem() {
  const removeButtons = document.querySelectorAll(".cart-item-remove");

  removeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".cart-item");

      gsap.to(item, {
        opacity: 0,
        x: -30,
        height: 0,
        paddingTop: 0,
        paddingBottom: 0,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => {
          item.remove();
          updateSummary();


          const remaining = document.querySelectorAll(".cart-item");
          if (remaining.length === 0) {
            showEmptyCart();
          }
        }
      });
    });
  });
}

function showEmptyCart() {
  const cartItems = document.querySelector(".cart-items");

  cartItems.innerHTML = `
    <div class="cart-empty">
      <i class="fas fa-shopping-bag"></i>
      <h3>Your cart is empty</h3>
      <p>Looks like you haven't added anything yet.</p>
      <a href="shop.html" class="btn-primary">Start Shopping</a>
    </div>
  `;


  const summary = document.querySelector(".cart-summary");
  gsap.to(summary, {
    opacity: 0.4,
    duration: 0.4
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
      gsap.to(couponInput, {
        x: -6,
        duration: 0.05,
        yoyo: true,
        repeat: 5,
        ease: "none"
      });
      couponInput.style.borderColor = "#ff4444";
      setTimeout(() => {
        couponInput.style.borderColor = "";
      }, 1000);
    }
  });
}
function initCartReveal() {
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
function initCart() {
  initCartQuantity();
  initRemoveItem();
  initCoupon();
  initCartReveal();
  updateSummary();
}

initCart();