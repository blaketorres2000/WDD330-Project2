/***************************************************** 
Function to add a product to the cart
*****************************************************/

export function addToCart(productName) {
  // Get the product details from the JSON file
  fetch("/json/products.json")
    .then((response) => response.json())
    .then((data) => {
      var product = findProductByName(data, productName);

      // Get the existing cart items from local storage
      var cartItems = JSON.parse(localStorage.getItem("cart")) || [];

      // Check if the product is already in the cart
      var existingItem = cartItems.find((item) => item.name === productName);

      if (existingItem) {
        // Increment the quantity if the product is already in the cart
        existingItem.quantity++;
      } else {
        // Add the product to the cart with quantity 1
        cartItems.push({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
        });
      }

      // Save the updated cart items to local storage
      localStorage.setItem("cart", JSON.stringify(cartItems));

      // Call the function to add the spinning animation
      addSpinAnimation();
    })
    .catch((error) => {
      console.error("Error adding to cart:", error);
    });
  displayCartItems();
  displayCartSummary();

  // Remove the spinning animation after a delay (e.g., 1 second)
  setTimeout(removeSpinAnimation, 1500);
}

/*****************************************************
Function to increment quantity of a product in the cart
*****************************************************/

export function incrementQuantity(productName) {
  updateCartItemQuantity(productName, 1);
}

/*****************************************************
Function to decrement quantity of a product in the cart
*****************************************************/

export function decrementQuantity(productName) {
  updateCartItemQuantity(productName, -1);
}

/*****************************************************
Function to update quantity of a product in the cart
*****************************************************/

function updateCartItemQuantity(productName, quantityChange) {
  var cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  // Find the product in the cart
  var existingItem = cartItems.find((item) => item.name === productName);

  if (existingItem) {
    // Update the quantity with the specified change
    existingItem.quantity += quantityChange;

    // Remove the item from the cart if quantity becomes zero
    if (existingItem.quantity === 0) {
      cartItems = cartItems.filter((item) => item.name !== productName);
    }

    // Save the updated cart items to local storage
    localStorage.setItem("cart", JSON.stringify(cartItems));

    // Refresh the displayed cart items and summary
    displayCartItems();
    displayCartSummary();
  }
}

/*****************************************************
Function to remove a product from the cart
*****************************************************/

export function removeItem(productName) {
  var cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  // Remove the item from the cart
  cartItems = cartItems.filter((item) => item.name !== productName);

  // Save the updated cart items to local storage
  localStorage.setItem("cart", JSON.stringify(cartItems));

  // Refresh the displayed cart items and summary
  displayCartItems();
  displayCartSummary();
}

/***************************************************** 
Function to display a product in the cart
*****************************************************/

export function displayCartItems() {
  var cartItemsContainer = document.getElementById("cart-items");
  if (cartItemsContainer) {
    // Get the cart items from local storage
    var cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    // Clear existing content
    cartItemsContainer.innerHTML = "";

    // Create the cart items container
    var cartItemsContainerDiv = document.createElement("div");
    cartItemsContainerDiv.classList.add("cartItemsContainer");

    // Render each cart item
    cartItems.forEach(function (item) {
      var cartItemElement = document.createElement("div");
      cartItemElement.classList.add("oneItemCart");
      cartItemElement.innerHTML = `
            <div class="oneItemName">
              <h2 class="itemName">${item.name}</h2>
            </div>
            <p class="itemPrice">Price: $${item.price.toFixed(2)}</p>
            <div class="oneItemQuantity">
              <p class="itemQty">Quantity: ${item.quantity}</p>
              <div class="oneItemButtons">
                <button class="increase-button" data-product="${
                  item.name
                }"> + </button>
                <button class="decrease-button" data-product="${
                  item.name
                }"> - </button>
              </div>
            </div>
            <button class="delete-button" data-product="${
              item.name
            }">Delete Item</button>
            <hr>
          `;
      cartItemsContainerDiv.appendChild(cartItemElement);
    });

    // Append the cart items container to the main container
    cartItemsContainer.appendChild(cartItemsContainerDiv);
  }
}

/***************************************************** 
Toggle between list and card view
*****************************************************/

document.addEventListener("DOMContentLoaded", function () {
  const toggleViewButton = document.getElementById("toggle-view-button");
  const cartItemsContainer = document.getElementById("cart-items");

  if (toggleViewButton && cartItemsContainer) {
    toggleViewButton.addEventListener("click", () => {
      cartItemsContainer.classList.toggle("list-view");
    });
  }
});

/***************************************************** 
Call the displayCartItems function when the cart page is loaded
*****************************************************/

document.addEventListener("DOMContentLoaded", function () {
  displayCartItems();
});

/*****************************************************
Function to find a product by name in the data
*****************************************************/

function findProductByName(data, productName) {
  var categories = Object.keys(data);
  for (var i = 0; i < categories.length; i++) {
    var products = data[categories[i]];
    var product = products.find((p) => p.name === productName);
    if (product) {
      return product;
    }
  }
  return null;
}

/*****************************************************
Function to display the total number of items and total price in the cart
*****************************************************/

export function displayCartSummary() {
  var cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  // Calculate total quantity and total price
  var totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  var totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Display total quantity and total price on the cart page
  var cartSummaryContainer = document.getElementById("cart-summary");
  if (cartSummaryContainer) {
    cartSummaryContainer.innerHTML = `
        <h2>Cart Summary</h2>
        <div class="cart-sums">
          <p>Total Items: ${totalQuantity}</p>
          <p>Total Price: $${totalPrice.toFixed(2)}</p>
        </div>
      `;
  }
}

/*****************************************************
Call the displayCartSummary function when the cart page is loaded
*****************************************************/

document.addEventListener("DOMContentLoaded", function () {
  displayCartSummary();
});

/***************************************************** 
Function to handle sending the user to the checkout page
*****************************************************/

export function checkout() {
  // Redirect to the checkout page
  window.location.href = "/views/checkout/index.html";
}

/*****************************************************
Call the checkout function when the Checkout button is clicked
*****************************************************/

document.addEventListener("DOMContentLoaded", function () {
  var checkoutButton = document.getElementById("checkout-button");
  if (checkoutButton) {
    checkoutButton.addEventListener("click", function () {
      checkout();
    });
  }
});

/*****************************************************
Function to add a spinning animation to the cart icon
*****************************************************/

function addSpinAnimation() {
  var cartIcon = document.getElementById("cart-icon");
  if (cartIcon) {
    cartIcon.classList.add("spin");
  }
}

/*****************************************************
Function to remove the spinning animation from the cart icon
*****************************************************/

function removeSpinAnimation() {
  var cartIcon = document.getElementById("cart-icon");
  if (cartIcon) {
    cartIcon.classList.remove("spin");
  }
}
