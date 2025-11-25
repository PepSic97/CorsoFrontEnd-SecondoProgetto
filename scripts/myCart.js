import { renderProducts } from "./renderProducts.js";
import { updateCounters } from "./updateCounters.js";
import { state, cartList, productList } from "./exportedFiles.js";

export async function toggleCart(id) {
    const existing = state.cart.find(c => c.id === id);

    if (existing) {
        state.cart = state.cart.filter(c => c.id !== id);
    } else {
        state.cart.push({ id, qty: 1 });
    }

    saveCart();
    updateCounters();

    if (cartList) renderCart();
    if (productList) renderProducts();
}

export async function updateQty(id, amount) {
    const item = state.cart.find(c => c.id === id);
    if (!item) return;

    item.qty += amount;
    if (item.qty <= 0) {
        state.cart = state.cart.filter(c => c.id !== id);
    }

    saveCart();
    renderCart();
    updateCounters();
}

export async function renderCart() {
    cartList.innerHTML = "";

    state.cart.forEach(item => {
        const p = state.products.find(pr => pr.id === item.id);
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

export async function saveCart() {
    localStorage.setItem("cart", JSON.stringify(state.cart));
}