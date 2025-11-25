import { loadProducts } from "./loadProducts.js";
import { searchInput, categoryFilter } from "./exportedFiles.js";
import { applyFilters } from "./applyFilters.js";

if (searchInput) searchInput.addEventListener("input", applyFilters);
if (categoryFilter) categoryFilter.addEventListener("change", applyFilters);

loadProducts();
