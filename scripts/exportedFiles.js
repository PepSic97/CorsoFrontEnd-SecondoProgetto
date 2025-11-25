export const state = {
    products: [],
    filteredProducts: [],
    cart: JSON.parse(localStorage.getItem("cart") || "[]"),
    favourites: JSON.parse(localStorage.getItem("favourites") || "[]"),

    currentPage: 1,
    perPage: 10
};


export let productList = document.getElementById("productList");
export let cartList = document.getElementById("cartList");
export let favList = document.getElementById("favList");

export let searchInput = document.getElementById("searchInput");
export let categoryFilter = document.getElementById("categoryFilter");

export let cartCount = document.getElementById("cartCount");
export let favCount = document.getElementById("favCount");

export let prevPage = document.getElementById("prevPage");
export let nextPage = document.getElementById("nextPage");
export let pageInfo = document.getElementById("pageInfo");




