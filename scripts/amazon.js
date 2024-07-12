import { cart, addToCart, calculateCartQuantity } from "../data/cart.js";
import { products, loadProducts } from "../data/products.js";

loadProducts(renderProductsGrid);
function renderProductsGrid() {
  let productsHTML = "";
  const url = new URL(window.location.href);
  const search = url.searchParams.get("search");

  console.log(search);

  let filteredProducts = products;

  if (search) {
    filteredProducts = products.filter((product) => {
      return product.name.toLowerCase().includes(search.toLowerCase());
    });
  }

  console.log(filteredProducts);

  filteredProducts.forEach((product) => {
    productsHTML += `
      <div class="product-container">
          <div class="product-image-container">
            <img
              class="product-image"
              src="${product.image}"
            />
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img
              class="product-rating-stars"
              src="${product.getStarUrl()}"
            />
            <div class="product-rating-count link-primary">${
              product.rating.count
            }</div>
          </div>

          <div class="product-price">${product.getPrice()}</div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          ${product.extraInfoHTML()}

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="${product.image}" />
            Added
          </div>

          <button class="add-to-cart-button button-primary" data-product-id="${
            product.id
          }">Add to Cart</button>
        </div>
    `;
  });

  document.querySelector(".js-products-grid").innerHTML = productsHTML;

  function updateCartQuantity() {
    document.querySelector(".js-cart-quantity").innerHTML =
      calculateCartQuantity();
  }

  updateCartQuantity();

  document.querySelectorAll(".add-to-cart-button").forEach((button) => {
    button.addEventListener("click", () => {
      let productId = button.dataset.productId;

      addToCart(productId);
      updateCartQuantity();
    });
  });

  document.querySelector(".js-search-button").addEventListener("click", () => {
    const search = document.querySelector(".js-search-input").value;
    window.location.href = `amazon.html?search=${search}`;
  });
}
