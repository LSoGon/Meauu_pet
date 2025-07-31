class HeroCarousel {
  constructor(section) {
    this.section = section;
    this.track = section.querySelector("[data-carousel-track]");
    this.slides = section.querySelectorAll(".hero-carousel__slide");
    this.prevButton = section.querySelector("[data-carousel-prev]");
    this.nextButton = section.querySelector("[data-carousel-next]");
    this.dots = section.querySelectorAll("[data-dot-index]");
    this.dotsContainer = section.querySelector("[data-carousel-dots]");

    this.currentSlide = 0;
    this.slideCount = this.slides.length;
    this.autoplayInterval = null;

    // Get settings from section data attributes
    this.autoplay = this.section.dataset.autoplay === "true";
    this.autoplaySpeed = parseInt(this.section.dataset.autoplaySpeed) || 5;

    this.init();
  }

  init() {
    if (this.slideCount <= 1) return;

    // Add event listeners
    this.prevButton?.addEventListener("click", () => this.previousSlide());
    this.nextButton?.addEventListener("click", () => this.nextSlide());

    // Dots navigation
    this.dots.forEach((dot, index) => {
      dot.addEventListener("click", () => this.goToSlide(index));
    });

    // Touch/swipe support
    this.addSwipeSupport();

    // Keyboard navigation
    this.section.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") this.previousSlide();
      if (e.key === "ArrowRight") this.nextSlide();
    });

    // Start autoplay if enabled
    if (this.autoplay) {
      this.startAutoplay();

      // Pause on hover
      this.section.addEventListener("mouseenter", () => this.stopAutoplay());
      this.section.addEventListener("mouseleave", () => this.startAutoplay());
    }

    // Handle visibility change (pause when tab is not visible)
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        this.stopAutoplay();
      } else if (this.autoplay) {
        this.startAutoplay();
      }
    });
  }

  goToSlide(index) {
    // Deactivate current slide
    this.slides[this.currentSlide].classList.remove(
      "hero-carousel__slide--active"
    );
    this.dots[this.currentSlide]?.classList.remove(
      "hero-carousel__dot--active"
    );

    // Update current slide index
    this.currentSlide = index;

    // Activate new slide
    this.slides[this.currentSlide].classList.add(
      "hero-carousel__slide--active"
    );
    this.dots[this.currentSlide]?.classList.add("hero-carousel__dot--active");

    // Restart autoplay timer
    if (this.autoplay) {
      this.stopAutoplay();
      this.startAutoplay();
    }
  }

  nextSlide() {
    const nextIndex = (this.currentSlide + 1) % this.slideCount;
    this.goToSlide(nextIndex);
  }

  previousSlide() {
    const prevIndex =
      (this.currentSlide - 1 + this.slideCount) % this.slideCount;
    this.goToSlide(prevIndex);
  }

  startAutoplay() {
    this.autoplayInterval = setInterval(() => {
      this.nextSlide();
    }, this.autoplaySpeed * 1000);
  }

  stopAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
    }
  }

  addSwipeSupport() {
    let touchStartX = 0;
    let touchEndX = 0;

    this.track.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.changedTouches[0].screenX;
      },
      { passive: true }
    );

    this.track.addEventListener(
      "touchend",
      (e) => {
        touchEndX = e.changedTouches[0].screenX;
        this.handleSwipe(touchStartX, touchEndX);
      },
      { passive: true }
    );
  }

  handleSwipe(startX, endX) {
    const swipeThreshold = 50;
    const diff = startX - endX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swipe left - next slide
        this.nextSlide();
      } else {
        // Swipe right - previous slide
        this.previousSlide();
      }
    }
  }
}

// Initialize carousels when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  const carousels = document.querySelectorAll(".hero-carousel");
  carousels.forEach((carousel) => {
    // Pass settings via data attributes
    const section = carousel.closest("section");
    const autoplay =
      section.querySelector(".hero-carousel__wrapper").dataset.autoplay ||
      "true";
    const autoplaySpeed =
      section.querySelector(".hero-carousel__wrapper").dataset.autoplaySpeed ||
      "5";

    section.dataset.autoplay = autoplay;
    section.dataset.autoplaySpeed = autoplaySpeed;

    new HeroCarousel(section);
  });
});

// Handle Shopify theme editor events
document.addEventListener("shopify:section:load", (event) => {
  const carousel = event.target.querySelector(".hero-carousel");
  if (carousel) {
    const section = carousel.closest("section");
    new HeroCarousel(section);
  }
});

document.addEventListener("shopify:block:select", (event) => {
  const carousel = event.target.closest(".hero-carousel");
  if (carousel) {
    const section = carousel.closest("section");
    const slideIndex = Array.from(
      section.querySelectorAll(".hero-carousel__slide")
    ).indexOf(event.target);
    if (slideIndex >= 0) {
      const instance =
        section.heroCarouselInstance || new HeroCarousel(section);
      instance.goToSlide(slideIndex);
      instance.stopAutoplay();
    }
  }
});
