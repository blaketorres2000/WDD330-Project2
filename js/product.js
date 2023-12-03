import { addToCart } from "/js/cart.js";

/*****************************************************
Function to display the details of a selected product
*****************************************************/

function displayProductDetails(productName) {
  // Get the product details container
  var productDetailsContainer = document.getElementById("product-details");

  // Clear the existing content in the container
  productDetailsContainer.innerHTML = "";

  // Get the products from the json file using fetch
  fetch("/json/products.json")
    .then((response) => response.json())
    .then((data) => {
      // Find the product with the matching name
      var product = findProductByName(data, productName);

      // Create and append HTML elements for the product details
      var productDetailsElement = document.createElement("div");
      // Add a class to the product details element
      productDetailsElement.classList.add("product-details-card");
      productDetailsElement.innerHTML = `
                  <h2 class="details-name">${product.name}</h2>
                  <p class="details-description">${product.description}</p>
                  <p class="details-quantity">Quantity: ${product.quantity}</p>
                  <p class="details-price">Price: $${product.price.toFixed(
                    2
                  )}</p>
              `;
      productDetailsContainer.appendChild(productDetailsElement);

      // Update the heading with the selected product name
      updatePageHeading(product.name);
    })
    .catch((error) => {
      console.error("Error fetching product details:", error);
    });
}

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
  return null; // Product not found
}

/*****************************************************
Event listener to execute addToCart when the "Add to Cart" button is clicked
*****************************************************/

document.getElementById("add-to-cart").addEventListener("click", function () {
  var selectedProduct = new URLSearchParams(window.location.search).get(
    "product"
  );
  if (selectedProduct) {
    addToCart(decodeURIComponent(selectedProduct));
  }
});

/*****************************************************
Function to update the heading with the selected product name
*****************************************************/

function updatePageHeading(productName) {
  var pageHeading = document.getElementById("page-heading");
  if (pageHeading) {
    pageHeading.textContent = productName;
  }
}

/*****************************************************
Event listener to execute displayProductDetails when the DOM is loaded
*****************************************************/

document.addEventListener("DOMContentLoaded", function () {
  var selectedProduct = new URLSearchParams(window.location.search).get(
    "product"
  );
  if (selectedProduct) {
    displayProductDetails(decodeURIComponent(selectedProduct));
  }
});
