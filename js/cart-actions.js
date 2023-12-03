import { incrementQuantity, decrementQuantity, removeItem } from "/js/cart.js";

/*****************************************************
Function to handle click events on the cart items
*****************************************************/

document.addEventListener("DOMContentLoaded", function () {
  let cartItemsContainer = document.getElementById("cart-items");
  if (cartItemsContainer) {
    cartItemsContainer.addEventListener("click", function (event) {
      let target = event.target;
      if (target.classList.contains("increase-button")) {
        let productName = target.getAttribute("data-product");
        incrementQuantity(productName);
      } else if (target.classList.contains("decrease-button")) {
        let productName = target.getAttribute("data-product");
        decrementQuantity(productName);
      } else if (target.classList.contains("delete-button")) {
        let productName = target.getAttribute("data-product");
        removeItem(productName);
      }
    });
  }
});
