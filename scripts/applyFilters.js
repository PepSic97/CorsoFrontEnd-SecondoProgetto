import { renderProducts } from "./renderProducts.js";
import { state, categoryFilter, searchInput } from "./exportedFiles.js";


export async function applyFilters() {
    let list = [...state.products];

    if (searchInput.value.trim() !== "") {
        const q = searchInput.value.toLowerCase();
        list = list.filter(p => p.title.toLowerCase().includes(q));
    }

    if (categoryFilter.value !== "") {
        list = list.filter(p => p.category === categoryFilter.value);
    }

    state.filteredProducts.length = 0;
    state.filteredProducts.push(...list);
    state.currentPage = 1;
    renderProducts();
}