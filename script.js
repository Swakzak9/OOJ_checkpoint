// script.js

class Product {
    constructor(id, img, name, descr, price) {
      this.id = id;
      this.img = img;
      this.name = name;
      this.descr = descr;
      this.price = parseFloat(price.replace('$', ''));
    }
  }
  
  class ShoppingCartItem {
    constructor(product, quantity = 1) {
      this.product = product;
      this.quantity = quantity;
    }
  
    getTotalPrice() {
      return this.product.price * this.quantity;
    }
  }
  
  class ShoppingCart {
    constructor() {
      this.items = [];
    }
  
    addItem(product) {
      const existingItem = this.items.find(item => item.product.id === product.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        this.items.push(new ShoppingCartItem(product));
      }
      this.displayCart();
    }
  
    removeItem(productId) {
      const itemIndex = this.items.findIndex(item => item.product.id === productId);
      if (itemIndex !== -1) {
        if (this.items[itemIndex].quantity > 1) {
          this.items[itemIndex].quantity -= 1;
        } else {
          this.items.splice(itemIndex, 1);
        }
      }
      this.displayCart();
    }
  
    getTotalItems() {
      return this.items.reduce((total, item) => total + item.quantity, 0);
    }
  
    getTotalPrice() {
      return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
    }
  
    displayCart() {
      const cartItemsContainer = document.getElementById('cart-items');
      const cartTotalContainer = document.getElementById('cart-total');
      cartItemsContainer.innerHTML = '';
      this.items.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
          <p>${item.product.name} - Quantity: ${item.quantity} - Total: $${item.getTotalPrice().toFixed(2)}</p>
          <button onclick="cart.removeItem('${item.product.id}')">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItem);
      });
      cartTotalContainer.innerHTML = `Total Price: $${this.getTotalPrice().toFixed(2)}`;
      document.getElementById('cartAmount').innerText = this.getTotalItems();
    }
  }
  
  // Create products
  const products = [
    new Product("weret7", "asset/gas cooker.jpg", "Gas cooker", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti,itaque", "$250"),
    new Product("wertrt", "asset/pexels-pixabay-51383.jpg", "Camera", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti,itaque", "$450"),
    new Product("ertrui", "asset/TV.jpg", "Tv", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti,itaque", "$150"),
    new Product("sdsgs", "asset/wifi.webp", "Language translator", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti,itaque", "$250")
  ];
  
  // Create a shopping cart
  const cart = new ShoppingCart();
  
  // Function to display products
  function displayProducts() {
    const productsContainer = document.getElementById('case');
    products.forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.className = 'product';
      productDiv.innerHTML = `
        <img src="${product.img}" width="200px" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>${product.descr}</p>
        <div class="Price">
          <h3>$${product.price}</h3>
          <button onclick="cart.addItem(products.find(p => p.id === '${product.id}'))">Add to Cart</button>
        </div>
      `;
      productsContainer.appendChild(productDiv);
    });
  }
  
  // Display products on page load
  displayProducts();
  