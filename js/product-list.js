/*****************************************************
Function to display products based on the selected category
*****************************************************/

function displayProducts(category) {
  var productListContainer = document.getElementById("product-list");

  // Clear the existing content in the container
  productListContainer.innerHTML = "";

  // Get the products from the json file using fetch
  fetch("/json/products.json")
    .then((response) => response.json())
    .then((data) => {
      // Find the array of products for the selected category
      var products = data[category];

      // Create and append HTML elements for each product
      products.forEach((product) => {
        var productElement = document.createElement("div");
        // Add a class to the product element
        productElement.classList.add("product-card");
        productElement.innerHTML = `
        <h3 class="list-product-name">${product.name}</h3>
        <p>${product.description}</p>
        <p>Quantity: ${product.quantity}</p>
        <p class="list-price">Price: $${product.price.toFixed(
          2
        )}</p>                    
        <hr>
        `;
        productListContainer.appendChild(productElement);
      });

      // Update the heading with the selected category
      updatePageHeading(category);
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
    });
}

/*****************************************************
Function to update the heading with the selected category
*****************************************************/

function updatePageHeading(category) {
  var pageHeading = document.getElementById("page-heading");
  if (pageHeading) {
    // Capitalize the first letter of each word in the category
    var capitalizedCategory = capitalizeFirstLetter(category);
    pageHeading.textContent = `${capitalizedCategory}`;
  }
}

/*****************************************************
Function to capitalize the first letter of each word in a string
*****************************************************/

function capitalizeFirstLetter(str) {
  return str.replace(/\b\w/g, function (match) {
    return match.toUpperCase();
  });
}

/*****************************************************
Event listener to execute displayProducts when the DOM is loaded
*****************************************************/

document.addEventListener("DOMContentLoaded", function () {
  // Initial display based on the category from the URL parameter
  var selectedCategory = new URLSearchParams(window.location.search).get(
    "category"
  );
  if (selectedCategory) {
    displayProducts(selectedCategory);
  }

  // Event listeners for category links
  var categoryLinks = document.querySelectorAll(".category-link");
  categoryLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      var category = link.getAttribute("data-category");
      displayProducts(category);
    });
  });

  // Event listener for product list container for click events on product cards
  var productListContainer = document.getElementById("product-list");
  productListContainer.addEventListener("click", function (event) {
    var target = event.target;
    // Check if the clicked element or its parent is a product card
    var productCard = target.closest(".product-card");
    if (productCard) {
      var productName =
        productCard.querySelector(".list-product-name").textContent;
      // Redirect to the product details page with the selected product name
      window.location.href = `/views/products/index.html?product=${encodeURIComponent(
        productName
      )}`;
    }
  });
});

/*****************************************************
Event listener to execute a category being selected
*****************************************************/

document.addEventListener("DOMContentLoaded", function () {
  // Initial display based on the category from the URL parameter
  var selectedCategory = new URLSearchParams(window.location.search).get(
    "category"
  );
  if (selectedCategory) {
    displayProducts(selectedCategory);
  }

  // Event listener for category links
  var categoryLinks = document.querySelectorAll(".category-link");
  categoryLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      var category = link.getAttribute("data-category");
      displayProducts(category);
    });
  });
});
