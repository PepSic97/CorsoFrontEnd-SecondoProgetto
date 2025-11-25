import { state, cartCount, favCount } from "./exportedFiles.js";

export async  function updateCounters() {
    if (cartCount) cartCount.textContent = state.cart.length;
    if (favCount) favCount.textContent = state.favourites.length;
}