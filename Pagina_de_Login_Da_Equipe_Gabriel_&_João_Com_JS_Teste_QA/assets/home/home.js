document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const header = document.querySelector(".site-header");
    const menuToggle = document.getElementById("menu-toggle");
    const mainNav = document.getElementById("main-nav");
    const searchToggle = document.getElementById("search-toggle");
    const searchPanel = document.getElementById("search-panel");
    const searchClose = document.getElementById("search-close");
    const searchForm = document.getElementById("search-form");
    const searchInput = document.getElementById("product-search");
    const productGrid = document.getElementById("product-grid");
    const productCards = [...document.querySelectorAll(".product-card")];
    const filterChips = [...document.querySelectorAll(".filter-chip")];
    const productsStatus = document.getElementById("products-status");
    const emptyProducts = document.getElementById("empty-products");
    const clearSearch = document.getElementById("clear-search");
    const cartButton = document.getElementById("cart-button");
    const cartCount = document.getElementById("cart-count");
    const toast = document.getElementById("toast");
    const toastProduct = document.getElementById("toast-product");
    const newsletterForm = document.getElementById("newsletter-form");

    let currentFilter = "todos";
    let cartTotal = 0;
    let toastTimer;

    const normalizeText = (value) => value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();

    const closeMenu = () => {
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menu");
        mainNav.classList.remove("is-open");
        body.classList.remove("menu-open");
    };

    const closeSearchPanel = () => {
        searchToggle.setAttribute("aria-expanded", "false");
        searchPanel.setAttribute("aria-hidden", "true");
        searchPanel.classList.remove("is-open");
        body.classList.remove("search-open");
    };

    menuToggle.addEventListener("click", () => {
        const willOpen = menuToggle.getAttribute("aria-expanded") === "false";
        closeSearchPanel();
        menuToggle.setAttribute("aria-expanded", String(willOpen));
        menuToggle.setAttribute("aria-label", willOpen ? "Fechar menu" : "Abrir menu");
        mainNav.classList.toggle("is-open", willOpen);
        body.classList.toggle("menu-open", willOpen);
    });

    mainNav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    searchToggle.addEventListener("click", () => {
        const willOpen = searchToggle.getAttribute("aria-expanded") === "false";
        closeMenu();
        searchToggle.setAttribute("aria-expanded", String(willOpen));
        searchPanel.setAttribute("aria-hidden", String(!willOpen));
        searchPanel.classList.toggle("is-open", willOpen);
        body.classList.toggle("search-open", willOpen);
        if (willOpen) window.setTimeout(() => searchInput.focus(), 250);
    });

    searchClose.addEventListener("click", closeSearchPanel);

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMenu();
            closeSearchPanel();
        }
    });

    const updateProducts = (query = "") => {
        const normalizedQuery = normalizeText(query);
        let visibleCount = 0;

        productCards.forEach((card, index) => {
            const matchesCategory = currentFilter === "todos" || card.dataset.category === currentFilter;
            const matchesSearch = !normalizedQuery || normalizeText(card.dataset.name).includes(normalizedQuery);
            const isVisible = matchesCategory && matchesSearch;

            card.hidden = !isVisible;
            if (isVisible) {
                card.style.animationDelay = `${Math.min(visibleCount, 5) * 45}ms`;
                visibleCount += 1;
            }
        });

        emptyProducts.hidden = visibleCount !== 0;
        productGrid.hidden = visibleCount === 0;

        if (normalizedQuery) {
            productsStatus.textContent = `${visibleCount} ${visibleCount === 1 ? "resultado" : "resultados"} para “${query.trim()}”`;
        } else if (currentFilter !== "todos") {
            productsStatus.textContent = `${visibleCount} ${visibleCount === 1 ? "peça encontrada" : "peças encontradas"}`;
        } else {
            productsStatus.textContent = "";
        }
    };

    const setFilter = (filter) => {
        currentFilter = filter;
        filterChips.forEach((chip) => {
            const active = chip.dataset.filter === filter;
            chip.classList.toggle("is-active", active);
            chip.setAttribute("aria-pressed", String(active));
        });
        updateProducts(searchInput.value);
    };

    filterChips.forEach((chip) => {
        chip.setAttribute("aria-pressed", String(chip.classList.contains("is-active")));
        chip.addEventListener("click", () => setFilter(chip.dataset.filter));
    });

    document.querySelectorAll("[data-filter-link]").forEach((link) => {
        link.addEventListener("click", () => setFilter(link.dataset.filterLink));
    });

    searchForm.addEventListener("submit", (event) => {
        event.preventDefault();
        setFilter("todos");
        updateProducts(searchInput.value);
        closeSearchPanel();
        document.getElementById("novidades").scrollIntoView({ behavior: "smooth" });
    });

    clearSearch.addEventListener("click", () => {
        searchInput.value = "";
        setFilter("todos");
    });

    document.querySelectorAll(".wishlist-button").forEach((button) => {
        button.addEventListener("click", () => {
            const isFavorite = button.getAttribute("aria-pressed") === "true";
            button.setAttribute("aria-pressed", String(!isFavorite));
            button.textContent = isFavorite ? "♡" : "♥";
            const productName = button.closest(".product-card").dataset.name;
            button.setAttribute("aria-label", `${isFavorite ? "Adicionar" : "Remover"} ${productName} ${isFavorite ? "aos" : "dos"} favoritos`);
        });
    });

    const showToast = (productName, title = "Adicionado à sacola") => {
        toast.querySelector("strong").textContent = title;
        toastProduct.textContent = productName;
        toast.classList.add("is-visible");
        window.clearTimeout(toastTimer);
        toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 3200);
    };

    document.querySelectorAll(".quick-add").forEach((button) => {
        button.addEventListener("click", () => {
            cartTotal += 1;
            cartCount.textContent = String(cartTotal);
            cartButton.setAttribute("aria-label", `Abrir sacola, ${cartTotal} ${cartTotal === 1 ? "item" : "itens"}`);
            showToast(button.dataset.product);

            button.textContent = "Adicionado ✓";
            button.disabled = true;
            window.setTimeout(() => {
                button.textContent = "Adicionar à sacola";
                button.disabled = false;
            }, 1300);
        });
    });

    cartButton.addEventListener("click", () => {
        if (cartTotal === 0) {
            showToast("Escolha uma peça para começar.", "Sua sacola está vazia");
        } else {
            showToast(`${cartTotal} ${cartTotal === 1 ? "item selecionado" : "itens selecionados"}`, "Sua sacola");
        }
    });

    newsletterForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const input = document.getElementById("newsletter-email");
        showToast(input.value, "Bem-vindo ao movimento!");
        newsletterForm.reset();
    });

    const updateHeader = () => {
        header.classList.toggle("is-scrolled", window.scrollY > 18);
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    document.getElementById("current-year").textContent = String(new Date().getFullYear());
});
