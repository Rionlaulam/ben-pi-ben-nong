const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");
const toast = document.querySelector(".toast");

const updateHeader = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
};

const showToast = (message) => {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 2200);
};

document.querySelectorAll(".photo-frame img").forEach((image) => {
  const markMissing = () => {
    image.closest(".photo-frame").classList.add("missing");
  };

  image.addEventListener("error", markMissing);

  if (image.complete && image.naturalWidth === 0) {
    markMissing();
  }
});

menuToggle.addEventListener("click", () => {
  const isOpen = header.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

nav.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    header.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  }
});

document.querySelectorAll("[data-copy]").forEach((button) => {
  button.addEventListener("click", async () => {
    const value = button.dataset.copy;

    try {
      await navigator.clipboard.writeText(value);
      showToast("คัดลอกเลขบัญชีแล้ว");
    } catch {
      showToast(value);
    }
  });
});

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();
