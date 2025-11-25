/* ===========================
   GLOBAL
=========================== */
let products = [];
let filteredProducts = [];

let cart = JSON.parse(localStorage.getItem("cart") || "[]");
let favourites = JSON.parse(localStorage.getItem("favourites") || "[]");

let currentPage = 1;
const perPage = 8;

/* ===========================
   DOM
=========================== */
const productList = document.getElementById("productList");
const cartList = document.getElementById("cartList");
const favList = document.getElementById("favList");

const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");

const cartCount = document.getElementById("cartCount");
const favCount = document.getElementById("favCount");

const prevPage = document.getElementById("prevPage");
const nextPage = document.getElementById("nextPage");
const pageInfo = document.getElementById("pageInfo");


/* ===========================
   LOAD PRODUCTS
=========================== */
async function loadProducts() {
    const res = await fetch("https://dummyjson.com/products?limit=100");
    const data = await res.json();
    products = data.products;

    if (productList) {
        populateCategories();
        applyFilters();
    }
    if (cartList) renderCart();
    if (favList) renderFavourites();

    updateCounters();
}


/* ===========================
   CATEGORIES
=========================== */
function populateCategories() {
    const categories = [...new Set(products.map(p => p.category))];
    categories.forEach(cat => {
        const opt = document.createElement("option");
        opt.value = cat;
        opt.textContent = cat;
        categoryFilter.appendChild(opt);
    });
}


/* ===========================
   FILTERS + SEARCH
=========================== */
function applyFilters() {
    let list = [...products];

    if (searchInput.value.trim() !== "") {
        const q = searchInput.value.toLowerCase();
        list = list.filter(p => p.title.toLowerCase().includes(q));
    }

    if (categoryFilter.value !== "") {
        list = list.filter(p => p.category === categoryFilter.value);
    }

    filteredProducts = list;
    currentPage = 1;
    renderProducts();
}


/* ===========================
   RENDER HOME
=========================== */
function renderProducts() {
    productList.innerHTML = "";

    const start = (currentPage - 1) * perPage;
    const items = filteredProducts.slice(start, start + perPage);

    items.forEach(p => {
        const isFav = favourites.includes(p.id);
        const inCart = cart.find(c => c.id === p.id);

        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
            <span class="favorite-icon" onclick="toggleFavourite(${p.id})">
                ${isFav ? "★" : "☆"}
            </span>

            <img src="${p.thumbnail}" alt="${p.title}">
            <h3>${p.title}</h3>
            <p>${p.description}</p>

            <div class="price">${p.price}€</div>

            <button onclick="toggleCart(${p.id})">
                ${inCart ? "Rimuovi dal carrello" : "Aggiungi al carrello"}
            </button>
        `;

        productList.appendChild(card);
    });

    updatePagination();
}


/* ===========================
   PAGINATION
=========================== */
function updatePagination() {
    const totalPages = Math.ceil(filteredProducts.length / perPage);
    pageInfo.textContent = `Pagina ${currentPage} di ${totalPages}`;
}

if (prevPage) {
    prevPage.onclick = () => {
        if (currentPage > 1) {
            currentPage--;
            renderProducts();
        }
    };
}

if (nextPage) {
    nextPage.onclick = () => {
        if (currentPage * perPage < filteredProducts.length) {
            currentPage++;
            renderProducts();
        }
    };
}


/* ===========================
   CART
=========================== */
function toggleCart(id) {
    const existing = cart.find(c => c.id === id);

    if (existing) {
        cart = cart.filter(c => c.id !== id);
    } else {
        cart.push({ id, qty: 1 });
    }

    saveCart();
    updateCounters();

    if (cartList) renderCart();
    if (productList) renderProducts();
}

function updateQty(id, amount) {
    const item = cart.find(c => c.id === id);
    if (!item) return;

    item.qty += amount;
    if (item.qty <= 0) {
        cart = cart.filter(c => c.id !== id);
    }

    saveCart();
    renderCart();
    updateCounters();
}

function renderCart() {
    cartList.innerHTML = "";

    cart.forEach(item => {
        const p = products.find(pr => pr.id === item.id);
        if (!p) return;

        const card = document.createElement("div");
        card.className = "cart-card";

        card.innerHTML = `
            <img src="${p.thumbnail}">
            <h3>${p.title}</h3>
            <div class="price">${p.price}€</div>

            <div class="cart-qty">
                <button onclick="updateQty(${p.id}, -1)">-</button>
                <span>${item.qty}</span>
                <button onclick="updateQty(${p.id}, 1)">+</button>
            </div>

            <button onclick="toggleCart(${p.id})">Rimuovi</button>
        `;

        cartList.appendChild(card);
    });
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}


/* ===========================
   FAVOURITES
=========================== */
function toggleFavourite(id) {
    if (favourites.includes(id)) {
        favourites = favourites.filter(f => f !== id);
    } else {
        favourites.push(id);
    }

    localStorage.setItem("favourites", JSON.stringify(favourites));
    updateCounters();

    if (favList) renderFavourites();
    if (productList) renderProducts();
}

function renderFavourites() {
    favList.innerHTML = "";

    favourites.forEach(id => {
        const p = products.find(pr => pr.id === id);

        const card = document.createElement("div");
        card.className = "fav-card";

        card.innerHTML = `
            <span class="favorite-icon" onclick="toggleFavourite(${p.id})">★</span>
            <img src="${p.thumbnail}">
            <h3>${p.title}</h3>
            <div class="price">${p.price}€</div>

            <button onclick="toggleFavourite(${p.id})">Rimuovi dai preferiti</button>
        `;

        favList.appendChild(card);
    });
}


/* ===========================
   COUNTERS
=========================== */
function updateCounters() {
    if (cartCount) cartCount.textContent = cart.length;
    if (favCount) favCount.textContent = favourites.length;
}


/* ===========================
   EVENTS
=========================== */
if (searchInput) searchInput.addEventListener("input", applyFilters);
if (categoryFilter) categoryFilter.addEventListener("change", applyFilters);


/* ===========================
   INIT
=========================== */
loadProducts();
