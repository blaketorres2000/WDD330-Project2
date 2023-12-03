import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 3000,
  },

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "general.js"),
        cart: resolve(__dirname, "js/cart.js"),
        product: resolve(__dirname, "js/product.js"),
        productList: resolve(__dirname, "js/product-list.js"),
        checkout: resolve(__dirname, "js/checkout.js"),
      },
    },
  },
});
