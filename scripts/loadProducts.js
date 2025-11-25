import { populateCategories } from "./populateCategories.js";
import { applyFilters } from "./applyFilters.js";
import { renderCart } from "./myCart.js";
import { renderFavourites } from "./myFavourites.js";
import { updateCounters } from "./updateCounters.js";
import { state, productList, cartList, favList } from "./exportedFiles.js";

export async function loadProducts() {
    
    let res = await fetch("https://dummyjson.com/products?limit=100");
    let data = await res.json();
    state.products.length = 0;
    state.products.push(...data.products);

    if (productList) {
        populateCategories();
        applyFilters();
    }
    if (cartList) renderCart();
    if (favList) renderFavourites();

    updateCounters();
}