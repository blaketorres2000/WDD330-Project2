/***************************************************** 
Function to display checkout details on the checkout page
*****************************************************/

function displayCheckoutDetails() {
  var cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  // Calculate subtotal, tax, shipping, and total
  var subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  var taxRate = 0.0825; // 8.25%
  var tax = subtotal * taxRate;
  var shipping = calculateShipping(cartItems);
  var total = subtotal + tax + shipping;

  // Calculate total quantity of items in the cart
  var totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Display details on the checkout page, including total quantity
  var checkoutDetailsContainer = document.getElementById("checkout-details");
  if (checkoutDetailsContainer) {
    checkoutDetailsContainer.innerHTML = `
        <h2>Checkout Summary</h2>
        <p>Total Items: ${totalItems}</p>
        <p>Subtotal: $${subtotal.toFixed(2)}</p>
        <p>Tax (8.25%): $${tax.toFixed(2)}</p>
        <p>Shipping: $${shipping.toFixed(2)}</p>
        <p>_______________________________________</p>
        <p class="checkoutTotal">Total: $${total.toFixed(2)}</p>
      `;
  }
}

/***************************************************** 
Function to calculate shipping based on the number of items
*****************************************************/

function calculateShipping(cartItems) {
  var itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  var baseShipping = 5;
  var additionalShipping = 1;
  var maxShipping = 10;

  // Calculate shipping cost
  var shipping = baseShipping + (itemCount - 1) * additionalShipping;

  // Cap the shipping cost at the maximum value
  return Math.min(shipping, maxShipping);
}

/***************************************************** 
Call the displayCheckoutDetails function when the checkout page is loaded
*****************************************************/

document.addEventListener("DOMContentLoaded", function () {
  displayCheckoutDetails();

  var checkoutForm = document.getElementById("checkoutForm");
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", function (event) {
      event.preventDefault();
      console.log("Submit Order button clicked");

      // Call processCart to display order confirmation
      processCart();
    });
  } else {
    console.log("Checkout form not found");
  }
});

/***************************************************** 
Function to validate the form fields
*****************************************************/

function validateForm() {
  var fullName = document.getElementById("fullName").value;
  var address = document.getElementById("address").value;
  var city = document.getElementById("city").value;
  var zipCode = document.getElementById("zipCode").value;
  var cardNumber = document.getElementById("cardNumber").value;
  var expiryDate = document.getElementById("expiryDate").value;
  var cvv = document.getElementById("cvv").value;

  // Check if any of the required fields are empty
  if (
    !fullName ||
    !address ||
    !city ||
    !zipCode ||
    !cardNumber ||
    !expiryDate ||
    !cvv
  ) {
    alert("Please fill out all the required fields");
    return false;
  }

  return true;
}

/***************************************************** 
Function to display order details in the console
*****************************************************/

function processCart() {
  // Validate the form before proceeding
  if (!validateForm()) {
    return;
  }

  // Gather information
  var fullName = document.getElementById("fullName").value;
  var address = document.getElementById("address").value;
  var city = document.getElementById("city").value;
  var zipCode = document.getElementById("zipCode").value;
  var cardNumber = document.getElementById("cardNumber").value;
  var expiryDate = document.getElementById("expiryDate").value;
  var cvv = document.getElementById("cvv").value;

  var cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  var totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Calculate subtotal, tax, shipping, and total
  var subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  var taxRate = 0.0825;
  var tax = (subtotal * taxRate).toFixed(2);
  var shipping = calculateShipping(cartItems).toFixed(2);
  var total = (subtotal + parseFloat(tax) + parseFloat(shipping)).toFixed(2);

  // Log information
  console.log("Shipping Information:", { fullName, address, city, zipCode });
  console.log("Credit Card Information:", { cardNumber, expiryDate, cvv });
  console.log("Cart Items:", cartItems);
  console.log("Order Summary:", {
    totalItems,
    subtotal: subtotal.toFixed(2),
    tax,
    shipping,
    total,
  });

  // Display order confirmation
  displayOrderConfirmation();
}

/***************************************************** 
Function to display order confirmation message
*****************************************************/

function displayOrderConfirmation() {
  var orderNumber = generateOrderNumber();
  var orderConfirmationContainer =
    document.getElementById("order-confirmation");

  if (orderConfirmationContainer) {
    orderConfirmationContainer.innerHTML = `
          <h1>Order Successful!</h1>
          <p>Thank you for your order. Your order number is <span id="order-number">${orderNumber}</span>.</p>
          <p>You will receive an email confirmation shortly.</p>
          <p>Your order should ship in 2 business days by USPS Flat Rate service.</p>
          <p>Have a great day!</p>
          <p><a href="#" id="return-home">Return to Home Page</a></p>
        `;

    // Add event listener to the "Return to Home Page" link
    var returnHomeLink = document.getElementById("return-home");
    if (returnHomeLink) {
      returnHomeLink.addEventListener("click", function (event) {
        event.preventDefault();
        localStorage.removeItem("cart");
        window.location.href = "/";
      });
    }
  }
}

/***************************************************** 
Function to generate order number
*****************************************************/

function generateOrderNumber() {
  // Get the current time (hhmmss)
  var currentTime = new Date();
  var formattedTime = `${currentTime
    .getHours()
    .toString()
    .padStart(2, "0")}${currentTime
    .getMinutes()
    .toString()
    .padStart(2, "0")}${currentTime.getSeconds().toString().padStart(2, "0")}`;

  // Get the current date (mmddyyyy)
  var formattedDate = `${(currentTime.getMonth() + 1)
    .toString()
    .padStart(2, "0")}${currentTime
    .getDate()
    .toString()
    .padStart(2, "0")}${currentTime.getFullYear()}`;

  // Create the order number sequence using time and date
  var orderNumberSequence = `${formattedTime}-${formattedDate}`;

  return orderNumberSequence;
}
