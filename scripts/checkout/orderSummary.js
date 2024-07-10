import {
  cart,
  removeFromCart,
  saveToLocal,
  calculateCartQuantity,
  updateQuantity,
  updateDliveryOption,
} from "../../data/cart.js";
import {
  deliveryOptions,
  getDeliveryOption,
  calculateDeliveryDate,
} from "../../data/deliveryOptions.js";
import { products, getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";

export function renderOrderSummary() {
  let cartSummaryHTML = "";
  function updateCartQuantity() {
    renderCheckoutHeader();

    saveToLocal();
  }

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    const matchingItem = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);

    updateCartQuantity();

    cartSummaryHTML += `
      <div class="cart-item-container 
      js-cart-item-container
      js-cart-item-container-${productId}">
        <div class="delivery-date js-delivery-date">Delivery date: ${calculateDeliveryDate(
          deliveryOption
        )}</div>
  
        <div class="cart-item-details-grid">
          <img
          class="product-image"
          src="${matchingItem.image}"
          />
  
          <div class="cart-item-details">
            <div class="product-name">
              ${matchingItem.name}
            </div>
            <div class="product-price">${matchingItem.getPrice()}</div>
          <div class="product-quantity
          js-product-quantity-${matchingItem.id}">
              <span> Quantity: <span class="quantity-label js-quantity-label" data-product-id="${
                matchingItem.id
              }">${cartItem.quantity}</span> </span>
              <span class="update-quantity-link link-primary js-update-link" data-product-id="${
                matchingItem.id
              }">
              Update
              </span>
              <input name="amount" class="quantity-input is-inputting-quantity js-quantity-input" data-product-id="${
                matchingItem.id
              }">
              <span class="save-quantity-link link-primary js-save-link" data-product-id="${
                matchingItem.id
              }">Save</span>
              <span class='delete-quantity-link link-primary js-delete-link js-delete-link-${
                matchingItem.id
              }' data-product-id="${matchingItem.id}">
              Delete
              </span>
          </div>
          </div>
  
          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(matchingItem, cartItem)}
          </div>
          </div>
      </div>
      `;
  });

  document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

  function deliveryOptionsHTML(matchingItem, cartItem) {
    let html = "";

    deliveryOptions.forEach((deliveryOption) => {
      let priceString =
        deliveryOption.priceCents === 0
          ? "FREE"
          : `$${formatCurrency(deliveryOption.priceCents)} - `;

      let isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html += `
      <div class="delivery-option js-delivery-option"
      name="delivery-option-${matchingItem.id}"
      data-product-id="${matchingItem.id}"
      data-delivery-option-id="${deliveryOption.id}">
        <input
        type="radio"
        value="9.99"
        ${isChecked ? "checked" : ""}
        class="delivery-option-input js-delivery-option"
        name="delivery-option-${matchingItem.id}"
        />
        <div>
        <div class="delivery-option-date">${calculateDeliveryDate(
          deliveryOption
        )}</div>
        <div class="delivery-option-price">${priceString} Shipping</div>
        </div>
        
      </div>
      `;
    });
    return html;
  }

  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const productId = link.dataset.productId;

      removeFromCart(productId);

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.remove();

      updateCartQuantity();
      renderOrderSummary();
      renderPaymentSummary();
    });
  });

  document.querySelectorAll(".js-update-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;

      let container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.classList.add("is-editing-quantity");
    });
  });

  document.querySelectorAll(".js-save-link").forEach((link) => {
    link.addEventListener("click", () => {
      updateSaveLink(link);
    });
  });

  document.querySelectorAll(".js-quantity-input").forEach((link) => {
    link.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();

        let link = document.querySelector(`.js-save-link`);
        updateSaveLink(link);
      }
    });
  });

  function updateSaveLink(link) {
    const productId = link.dataset.productId;

    let newQuantityInput = document.querySelector(
      `.js-quantity-input[data-product-id="${productId}"]`
    );
    let newQuantity = Number(newQuantityInput.value);

    if (newQuantity < 0 || newQuantity >= 1000) {
      alert("Quantity must be at least 0 and less than 1000");
      return;
    }
    updateQuantity(productId, newQuantity);

    let container = document.querySelector(
      `.js-cart-item-container-${productId}`
    );
    container.classList.remove("is-editing-quantity");

    document.querySelector(".js-quantity-label").innerHTML = newQuantity;
    updateCartQuantity();
    renderOrderSummary();
    renderPaymentSummary();
  }

  document.querySelectorAll(".js-delivery-option").forEach((button) => {
    button.addEventListener("click", () => {
      const { productId, deliveryOptionId } = button.dataset;

      updateDliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}
