/**
 * Header JavaScript - Funcionalidades do cabeçalho
 */

class HeaderComponent {
  constructor() {
    this.header = document.querySelector(".header-wrapper");
    this.cartToggle = document.querySelector(".cart-toggle");
    this.moreButton = document.querySelector(".header-nav-more");
    this.searchInput = document.querySelector(".search-input");

    this.init();
  }

  init() {
    // Inicializar eventos
    if (this.cartToggle) {
      this.cartToggle.addEventListener("click", this.toggleCart.bind(this));
    }

    if (this.moreButton) {
      this.moreButton.addEventListener("click", this.toggleMoreMenu.bind(this));
    }

    // Sticky header com shadow on scroll
    this.handleScroll();
    window.addEventListener("scroll", this.handleScroll.bind(this));

    // Auto-hide header no mobile
    if (window.innerWidth <= 768) {
      this.initMobileHeader();
    }
  }

  toggleCart(e) {
    e.preventDefault();
    // Emitir evento customizado para o drawer do carrinho
    document.dispatchEvent(new CustomEvent("cart:toggle"));
  }

  toggleMoreMenu(e) {
    e.preventDefault();
    const isExpanded = this.moreButton.getAttribute("aria-expanded") === "true";
    this.moreButton.setAttribute("aria-expanded", !isExpanded);

    // Aqui você pode adicionar lógica para mostrar um dropdown
    // com categorias adicionais
  }

  handleScroll() {
    const scrolled = window.scrollY > 10;
    this.header.classList.toggle("header--scrolled", scrolled);
  }

  initMobileHeader() {
    let lastScroll = 0;

    window.addEventListener("scroll", () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScroll && currentScroll > 100) {
        // Scrolling down
        this.header.classList.add("header--hidden");
      } else {
        // Scrolling up
        this.header.classList.remove("header--hidden");
      }

      lastScroll = currentScroll;
    });
  }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", () => {
  new HeaderComponent();
});
