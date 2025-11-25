import { state, pageInfo } from "./exportedFiles.js";

export async function updatePagination() {
    const totalPages = Math.ceil(state.filteredProducts.length / state.perPage);
    pageInfo.textContent = `Pagina ${state.currentPage} di ${state.totalPages}`;
}
