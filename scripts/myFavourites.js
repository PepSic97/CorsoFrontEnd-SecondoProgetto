import { state, favList, productList } from "./exportedFiles.js";

export async function toggleFavourite(id) {
    if (state.favourites.includes(id)) {
        state.favourites = state.favourites.filter(f => f !== id);
    } else {
        state.favourites.push(id);
    }

    localStorage.setItem("favourites", JSON.stringify(state.favourites));
    updateCounters();

    if (favList) renderFavourites();
    if (productList) renderProducts();
}

export async function renderFavourites() {
    favList.innerHTML = "";

    state.favourites.forEach(id => {
        const p = state.products.find(pr => pr.id === id);

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

