import { calculateCartQuantity } from "../../data/cart.js";

export function renderCheckoutHeader() {
  let cartQuantity = calculateCartQuantity();
  document.querySelector(
    ".js-checkout-item"
  ).innerHTML = `${cartQuantity} items`;
}
