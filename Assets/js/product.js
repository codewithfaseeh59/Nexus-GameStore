
function initImageGallery() {
  const thumbs = document.querySelectorAll(".thumb");
  const mainImg = document.getElementById("mainProductImg");

  if (!thumbs.length || !mainImg) return;

  thumbs.forEach(thumb => {
    thumb.addEventListener("click", () => {

      thumbs.forEach(t => t.classList.remove("active"));
      thumb.classList.add("active");

      gsap.to(mainImg, {
        opacity: 0,
        scale: 1.02,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          mainImg.src = thumb.dataset.img;
          gsap.to(mainImg, {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        }
      });
    });
  });
}

function initQuantity() {
  const minusBtn = document.getElementById("qtyMinus");
  const plusBtn = document.getElementById("qtyPlus");
  const qtyValue = document.getElementById("qtyValue");

  if (!minusBtn || !plusBtn || !qtyValue) return;

  let qty = 1;

  plusBtn.addEventListener("click", () => {
    qty++;
    updateQty();
  });

  minusBtn.addEventListener("click", () => {
    if (qty > 1) {
      qty--;
      updateQty();
    }
  });

  function updateQty() {
    gsap.from(qtyValue, {
      y: -8,
      opacity: 0,
      duration: 0.2,
      ease: "power2.out"
    });
    qtyValue.textContent = qty;
  }
}

function initWishlist() {
  const wishlistBtn = document.querySelector(".product-wishlist-btn");
  if (!wishlistBtn) return;

  wishlistBtn.addEventListener("click", () => {
    wishlistBtn.classList.toggle("active");

    gsap.to(wishlistBtn, {
      scale: 1.2,
      duration: 0.15,
      yoyo: true,
      repeat: 1,
      ease: "power2.out"
    });
  });
}

function initAddToCart() {
  const cartBtn = document.querySelector(".product-cart-btn");
  if (!cartBtn) return;

  cartBtn.addEventListener("click", () => {
    const originalText = cartBtn.innerHTML;

    gsap.to(cartBtn, {
      scale: 0.96,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        cartBtn.innerHTML = `<i class="fas fa-check"></i> Added!`;
        cartBtn.style.background = "#1a1a2e";
        cartBtn.style.borderColor = "#7b2fff";

        setTimeout(() => {
          cartBtn.innerHTML = originalText;
          cartBtn.style.background = "";
          cartBtn.style.borderColor = "";
        }, 2000);
      }
    });
    const cartCount = document.querySelector(".cart-count");
    if (cartCount) {
      const current = parseInt(cartCount.textContent) || 0;
      cartCount.textContent = current + 1;

      gsap.from(cartCount, {
        scale: 0,
        duration: 0.3,
        ease: "back.out(1.7)"
      });
    }
  });
}

function initAccordion() {
  const accordionItems = document.querySelectorAll(".accordion-item");
  if (!accordionItems.length) return;

  accordionItems.forEach(item => {
    const head = item.querySelector(".accordion-head");
    const body = item.querySelector(".accordion-body");

    head.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      accordionItems.forEach(i => {
        i.classList.remove("active");
      });

      if (!isActive) {
        item.classList.add("active");
      }
    });
  });
}
function initProductReveal() {

  gsap.from(".product-images", {
    opacity: 0,
    x: -40,
    duration: 1,
    ease: "power3.out",
    delay: 0.2
  });

  gsap.from(".product-info > *", {
    opacity: 0,
    y: 30,
    duration: 0.7,
    ease: "power3.out",
    stagger: 0.1,
    delay: 0.3
  });
  gsap.from(".product-breadcrumb", {
    opacity: 0,
    y: -10,
    duration: 0.6,
    ease: "power3.out",
    delay: 0.1
  });
  gsap.from(".related-grid .prod-card", {
    opacity: 0,
    y: 40,
    duration: 0.7,
    ease: "power3.out",
    stagger: 0.1,
    scrollTrigger: {
      trigger: "#related-products",
      scroller: "#wrapper",
      start: "top 85%",
      once: true,
    }
  });

  gsap.from(".related-header", {
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#related-products",
      scroller: "#wrapper",
      start: "top 90%",
      once: true,
    }
  });
}

function initProduct() {
  initImageGallery();
  initQuantity();
  initWishlist();
  initAddToCart();
  initAccordion();
  initProductReveal();
}

initProduct();