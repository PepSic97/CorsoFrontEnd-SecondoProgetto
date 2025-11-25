import { updatePagination } from "./updatePagination.js";
import { state, productList } from "./exportedFiles.js";


export async function renderProducts() {
    productList.innerHTML = "";

    const start = (state.currentPage - 1) * state.perPage;
    const items = state.filteredProducts.slice(start, start + state.perPage);

    items.forEach(p => {
        const isFav = state.favourites.includes(p.id);
        const inCart = state.cart.find(c => c.id === p.id);

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