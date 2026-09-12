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
    const cartDialog = document.getElementById("cart-dialog");
    const cartClose = document.getElementById("cart-close");
    const cartItemsList = document.getElementById("cart-items");
    const cartEmpty = document.getElementById("cart-empty");
    const cartSummary = document.getElementById("cart-summary");
    const cartClear = document.getElementById("cart-clear");
    const infoDialog = document.getElementById("info-dialog");
    const infoClose = document.getElementById("info-close");
    const infoTitle = document.getElementById("info-title");
    const infoContent = document.getElementById("info-content");
    const infoLinks = [...document.querySelectorAll("[data-info]")];

    let currentFilter = "todos";
    const cartItems = [];
    let toastTimer;

    const information = {
        "central-ajuda": {
            title: "Central de ajuda",
            content: "Encontre produtos pela busca, filtre as coleções e use a área Minha conta para acompanhar seus dados. Para outras dúvidas, entre para a lista e acompanhe os canais oficiais da João Style."
        },
        trocas: {
            title: "Trocas e devoluções",
            content: "Você tem até 30 dias após o recebimento para solicitar troca de tamanho ou devolução. A peça deve estar sem sinais de uso e com as etiquetas originais."
        },
        rastreio: {
            title: "Rastrear pedido",
            content: "O código de rastreio fica disponível em Minha conta assim que o pedido é enviado. Esta versão de demonstração ainda não possui pedidos vinculados."
        },
        tamanhos: {
            title: "Guia de tamanhos",
            content: "PP: busto até 84 cm; P: 85 a 92 cm; M: 93 a 100 cm; G: 101 a 108 cm; GG: 109 a 118 cm. Para modelagem oversized, escolha seu tamanho habitual."
        },
        sustentabilidade: {
            title: "Sustentabilidade",
            content: "A João Style prioriza modelagens duráveis, materiais selecionados e produção consciente para reduzir desperdícios e ampliar a vida útil de cada peça."
        },
        carreiras: {
            title: "Trabalhe conosco",
            content: "Novas oportunidades serão divulgadas pelos canais oficiais. A João Style valoriza criatividade, respeito, diversidade e interesse por moda urbana."
        },
        privacidade: {
            title: "Privacidade",
            content: "Os dados informados nesta demonstração são usados apenas para validar a experiência local da interface. Nenhum cadastro ou pagamento é processado pela página Home."
        },
        termos: {
            title: "Termos de uso",
            content: "Esta é uma interface acadêmica de demonstração. Produtos, valores, benefícios e fluxos exibidos servem para fins de protótipo e teste de qualidade de software."
        }
    };

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
            const searchableText = `${card.dataset.name} ${card.textContent}`;
            const matchesSearch = !normalizedQuery || normalizeText(searchableText).includes(normalizedQuery);
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

    const renderCart = () => {
        const cartTotal = cartItems.length;
        const groupedItems = cartItems.reduce((items, productName) => {
            items[productName] = (items[productName] || 0) + 1;
            return items;
        }, {});

        cartItemsList.replaceChildren();

        Object.entries(groupedItems).forEach(([productName, quantity]) => {
            const item = document.createElement("li");
            const description = document.createElement("span");
            const name = document.createElement("strong");
            const amount = document.createElement("small");
            const removeButton = document.createElement("button");

            name.textContent = productName;
            amount.textContent = `${quantity} ${quantity === 1 ? "unidade" : "unidades"}`;
            description.append(name, amount);

            removeButton.type = "button";
            removeButton.dataset.removeProduct = productName;
            removeButton.textContent = "Remover";
            removeButton.setAttribute("aria-label", `Remover uma unidade de ${productName} da sacola`);

            item.append(description, removeButton);
            cartItemsList.append(item);
        });

        cartEmpty.hidden = cartTotal !== 0;
        cartItemsList.hidden = cartTotal === 0;
        cartClear.disabled = cartTotal === 0;
        cartCount.textContent = String(cartTotal);
        cartSummary.textContent = `${cartTotal} ${cartTotal === 1 ? "item selecionado" : "itens selecionados"}`;
        cartButton.setAttribute("aria-label", `Abrir sacola, ${cartTotal} ${cartTotal === 1 ? "item" : "itens"}`);
    };

    document.querySelectorAll(".quick-add").forEach((button) => {
        button.addEventListener("click", () => {
            cartItems.push(button.dataset.product);
            renderCart();
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
        renderCart();
        if (infoDialog.open) infoDialog.close();
        if (!cartDialog.open) cartDialog.showModal();
    });

    cartClose.addEventListener("click", () => cartDialog.close());

    cartClear.addEventListener("click", () => {
        cartItems.length = 0;
        renderCart();
        showToast("Todos os itens foram removidos.", "Sacola esvaziada");
    });

    cartItemsList.addEventListener("click", (event) => {
        const removeButton = event.target.closest("[data-remove-product]");
        if (!removeButton) return;

        const itemIndex = cartItems.indexOf(removeButton.dataset.removeProduct);
        if (itemIndex !== -1) cartItems.splice(itemIndex, 1);
        renderCart();
    });

    infoLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const selectedInformation = information[link.dataset.info];
            if (!selectedInformation) return;

            infoTitle.textContent = selectedInformation.title;
            infoContent.textContent = selectedInformation.content;
            if (cartDialog.open) cartDialog.close();
            if (!infoDialog.open) infoDialog.showModal();
        });
    });

    infoClose.addEventListener("click", () => infoDialog.close());

    [cartDialog, infoDialog].forEach((dialog) => {
        dialog.addEventListener("click", (event) => {
            if (event.target === dialog) dialog.close();
        });
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
    renderCart();
    window.addEventListener("scroll", updateHeader, { passive: true });
    document.getElementById("current-year").textContent = String(new Date().getFullYear());
});
