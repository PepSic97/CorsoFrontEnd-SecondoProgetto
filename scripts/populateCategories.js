import { state, categoryFilter } from "./exportedFiles.js";

export async function populateCategories() {
    const categories = [...new Set(state.products.map(p => p.category))];
    categories.forEach(cat => {
        const opt = document.createElement("option");
        opt.value = cat;
        opt.textContent = cat;
        categoryFilter.appendChild(opt);
    });
}
