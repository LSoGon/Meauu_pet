/**
 * Global JavaScript - Funcionalidades globais do tema
 */

// Utility functions
const Utils = {
  // Debounce function para otimizar performance
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Formatar preço em Real
  formatMoney(cents) {
    return (cents / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  },

  // Fazer fetch com CSRF token do Shopify
  fetchWithToken(url, options = {}) {
    const token = document.querySelector('meta[name="csrf-token"]')?.content;

    return fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": token,
        ...options.headers,
      },
    });
  },
};

// Cart API wrapper
class CartAPI {
  static async getCart() {
    const response = await fetch("/cart.js");
    return response.json();
  }

  static async addItem(variantId, quantity = 1) {
    const response = await Utils.fetchWithToken("/cart/add.js", {
      method: "POST",
      body: JSON.stringify({
        items: [
          {
            id: variantId,
            quantity: quantity,
          },
        ],
      }),
    });

    if (!response.ok) throw new Error("Failed to add item");
    return response.json();
  }

  static async updateItem(key, quantity) {
    const response = await Utils.fetchWithToken("/cart/change.js", {
      method: "POST",
      body: JSON.stringify({
        id: key,
        quantity: quantity,
      }),
    });

    if (!response.ok) throw new Error("Failed to update item");
    return response.json();
  }

  static async removeItem(key) {
    return this.updateItem(key, 0);
  }
}

// Cart Drawer Component
class CartDrawer {
  constructor() {
    this.drawer = null;
    this.isOpen = false;
    this.init();
  }

  init() {
    this.createDrawer();
    this.bindEvents();
  }

  createDrawer() {
    const drawer = document.createElement("div");
    drawer.className = "cart-drawer";
    drawer.innerHTML = `
      <div class="cart-drawer__overlay"></div>
      <div class="cart-drawer__container">
        <div class="cart-drawer__header">
          <h2 class="cart-drawer__title">Minha Sacola</h2>
          <button class="cart-drawer__close" aria-label="Fechar carrinho">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M6 18L18 6M6 6l12 12" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
        <div class="cart-drawer__items"></div>
        <div class="cart-drawer__footer">
          <div class="cart-drawer__subtotal">
            <span>Subtotal:</span>
            <span class="cart-drawer__subtotal-price">R$ 0,00</span>
          </div>
          <a href="/cart" class="cart-drawer__view-cart">Ver Sacola</a>
          <button class="cart-drawer__checkout" disabled>Finalizar Compra</button>
        </div>
      </div>
    `;

    document.body.appendChild(drawer);
    this.drawer = drawer;
  }

  bindEvents() {
    // Toggle cart event
    document.addEventListener("cart:toggle", () => this.toggle());

    // Close button
    this.drawer
      .querySelector(".cart-drawer__close")
      .addEventListener("click", () => this.close());

    // Overlay click
    this.drawer
      .querySelector(".cart-drawer__overlay")
      .addEventListener("click", () => this.close());

    // Cart update events
    document.addEventListener("cart:updated", () => this.updateDrawer());
  }

  async toggle() {
    this.isOpen ? this.close() : this.open();
  }

  async open() {
    this.isOpen = true;
    this.drawer.classList.add("cart-drawer--open");
    document.body.classList.add("overflow-hidden");
    await this.updateDrawer();
  }

  close() {
    this.isOpen = false;
    this.drawer.classList.remove("cart-drawer--open");
    document.body.classList.remove("overflow-hidden");
  }

  async updateDrawer() {
    try {
      const cart = await CartAPI.getCart();
      this.renderItems(cart);
      this.updateCartCount(cart.item_count);
      this.updateSubtotal(cart.total_price);
    } catch (error) {
      console.error("Failed to update cart:", error);
    }
  }

  renderItems(cart) {
    const itemsContainer = this.drawer.querySelector(".cart-drawer__items");

    if (cart.item_count === 0) {
      itemsContainer.innerHTML = `
        <div class="cart-drawer__empty">
          <p>Sua sacola está vazia</p>
          <a href="/collections/all" class="button">Continuar Comprando</a>
        </div>
      `;
      this.drawer.querySelector(".cart-drawer__checkout").disabled = true;
    } else {
      itemsContainer.innerHTML = cart.items
        .map(
          (item) => `
        <div class="cart-drawer__item" data-key="${item.key}">
          <div class="cart-drawer__item-image">
            <img src="${item.image}" alt="${item.title}" loading="lazy">
          </div>
          <div class="cart-drawer__item-details">
            <h3 class="cart-drawer__item-title">${item.title}</h3>
            <p class="cart-drawer__item-variant">${item.variant_title || ""}</p>
            <div class="cart-drawer__item-quantity">
              <button class="quantity-minus" data-key="${item.key}">-</button>
              <input type="number" value="${item.quantity}" min="1" data-key="${
            item.key
          }">
              <button class="quantity-plus" data-key="${item.key}">+</button>
            </div>
          </div>
          <div class="cart-drawer__item-price">
            ${Utils.formatMoney(item.line_price)}
          </div>
          <button class="cart-drawer__item-remove" data-key="${
            item.key
          }" aria-label="Remover item">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor">
              <path d="M5 5l10 10M5 15L15 5" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
      `
        )
        .join("");

      this.drawer.querySelector(".cart-drawer__checkout").disabled = false;
      this.bindItemEvents();
    }
  }

  bindItemEvents() {
    // Quantity buttons
    this.drawer
      .querySelectorAll(".quantity-minus, .quantity-plus")
      .forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          const key = e.target.dataset.key;
          const input = this.drawer.querySelector(`input[data-key="${key}"]`);
          const currentQty = parseInt(input.value);
          const newQty = e.target.classList.contains("quantity-plus")
            ? currentQty + 1
            : Math.max(1, currentQty - 1);

          input.value = newQty;
          await this.updateQuantity(key, newQty);
        });
      });

    // Quantity inputs
    this.drawer
      .querySelectorAll(".cart-drawer__item-quantity input")
      .forEach((input) => {
        input.addEventListener(
          "change",
          Utils.debounce(async (e) => {
            const key = e.target.dataset.key;
            const quantity = Math.max(1, parseInt(e.target.value) || 1);
            await this.updateQuantity(key, quantity);
          }, 500)
        );
      });

    // Remove buttons
    this.drawer.querySelectorAll(".cart-drawer__item-remove").forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        const key = e.target.dataset.key;
        await this.removeItem(key);
      });
    });
  }

  async updateQuantity(key, quantity) {
    try {
      await CartAPI.updateItem(key, quantity);
      await this.updateDrawer();
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  }

  async removeItem(key) {
    try {
      await CartAPI.removeItem(key);
      await this.updateDrawer();
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  }

  updateCartCount(count) {
    const bubble = document.querySelector(".cart-count-bubble");
    if (bubble) {
      bubble.textContent = count;
      bubble.classList.toggle("hidden", count === 0);
    }
  }

  updateSubtotal(price) {
    const subtotal = this.drawer.querySelector(".cart-drawer__subtotal-price");
    if (subtotal) {
      subtotal.textContent = Utils.formatMoney(price);
    }
  }
}

// Initialize components
document.addEventListener("DOMContentLoaded", () => {
  // Initialize cart drawer
  window.cartDrawer = new CartDrawer();

  // Add to cart forms
  document.addEventListener("submit", async (e) => {
    if (e.target.matches('form[action*="/cart/add"]')) {
      e.preventDefault();

      const formData = new FormData(e.target);
      const variantId = formData.get("id");
      const quantity = parseInt(formData.get("quantity") || 1);

      try {
        await CartAPI.addItem(variantId, quantity);
        document.dispatchEvent(new CustomEvent("cart:updated"));
        window.cartDrawer.open();
      } catch (error) {
        console.error("Failed to add to cart:", error);
      }
    }
  });
});
