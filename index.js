const express = require('express');
const { resolve } = require('path');
let cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
// app.use(express.static('static'));

//Cart Data
let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 },
];

/**
 * Endpoint 1: Add an Item to the Cart.
 * Objective: Add a new item to the cart using the provided details.
 * Endpoint: /cart/add
 * Query Parameters: i)productId: The ID of the product (integer).
                    ii)name: The name of the product (string).
                  iii)price: The price of the product (float).
                   iV)quantity: The quantity of the product (integer).
 * Your Task: Create a function that will add a new item to the cart using the details provided in the query parameters.
 * Example Call: http://localhost:3000/cart/add?productId=3&name=Tablet&price=15000&quantity=1
 * Expected Output:
{
	cartItems: [
	  { 'productId': 1, 'name': 'Laptop', 'price': 50000, 'quantity': 1 },
	  { 'productId': 2, 'name': 'Mobile', 'price': 20000, 'quantity': 2 },
	  { 'productId': 3, 'name': 'Tablet', 'price': 15000, 'quantity': 1 }
	]
}
 */
//function to additem in cart
function addItemToTheCart(productId, name, price, quantity) {
  cart.push({
    productId: productId,
    name: name,
    price: price,
    quantity: quantity,
  });
  return cart;
}
//Endpoint
app.get('/cart/add', (req, res) => {
  let productId = parseInt(req.query.productId);
  let name = req.query.name;
  let price = parseFloat(req.query.price);
  let quantity = parseInt(req.query.quantity);
  addItemToTheCart(productId, name, price, quantity);
  res.json({ cartItems: cart });
});

/**
 * Endpoint 2: Edit Quantity of an Item in the Cart
 * Objective: Edit the quantity of an existing item in the cart based on the product ID.
 * Endpoint: "/cart/edit"
 * Query Parameters: a)productId: The ID of the product (integer).
                     b) quantity: The new quantity of the product (integer).
 * Your Task: Create a function that will update the quantity of an item in the cart based on the product ID.
 * Example Call: http://localhost:3000/cart/edit?productId=2&quantity=3
 * Expected Output:
{
	cartItems: [
	  { 'productId': 1, 'name': 'Laptop', 'price': 50000, 'quantity': 1 },
	  { 'productId': 2, 'name': 'Mobile', 'price': 20000, 'quantity': 3 }
	]
}
 */
//function to edit an item in the cart by product id
function editItemInTheCart(productId, quantity) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].productId === productId) {
      cart[i].quantity = quantity;
      break;
    }
  }
  return cart;
}
//Endpoint
app.get('/cart/edit', (req, res) => {
  let productId = parseInt(req.query.productId);
  let quantity = parseInt(req.query.quantity);
  let result = editItemInTheCart(productId, quantity);
  res.json({ cartItems: result });
});

/**
 * Endpoint 3: Delete an Item from the Cart
 * Objective: Delete an item from the cart based on the product ID.
 * Endpoint: /cart/delete
 * Query Parameters: i) productId: The ID of the product to be deleted (integer).
 * Note: You’ll have to update the original array with the results of .filter() method. For example cart = cart.filter(...)
 * Your Task: Create a function that will remove an item from the cart based on the product ID.
 * Example Call: http://localhost:3000/cart/delete?productId=1
 * Expected Output:
{
	cartItems: [
	  { 'productId': 2, 'name': 'Mobile', 'price': 20000, 'quantity': 2 }
	]
}
 */
//function to delete an item from the cart.
function deleteItemFromCart(cartObj, productId) {
  return cartObj.productId !== productId;
}
//Endpoint
app.get('/cart/delete', (req, res) => {
  let productId = parseInt(req.query.productId);
  let result = cart.filter((cartObj) => deleteItemFromCart(cartObj, productId));
  cart = result; // Updating cart with filtered result
  res.json({ cartItems: result });
});

/**
 * Endpoint 4: Read Items in the Cart.
 * Objective: Return the current list of items in the cart.
 * Endpoint: "/cart"
 * Your Task: Create a function that will return the current state of the cart.
 * Example Call: http://localhost:3000/cart
 * Expected Output:
{
	cartItems: {
          { 'productId': 1, 'name': 'Laptop', 'price': 50000, 'quantity': 1 },
	  { 'productId': 2, 'name': 'Mobile', 'price': 20000, 'quantity': 2 },
	]
}
 */
//function to return the current state of the cart.
function currentStateOfCart() {
  return cart;
}
//Endpoint
app.get('/cart', (req, res) => {
  let result = currentStateOfCart();
  res.json({ cartItems: result });
});

/**
 * Endpoint 5: Calculate Total Quantity of Items in the Cart
 * Objective: Calculate and return the total quantity of items in the cart.
 * Endpoint: /cart/total-quantity
 * Your Task: Create a function that will calculate the total quantity of items in the cart.
 * Example Call: http://localhost:3000/cart/total-quantity
 * Expected Output: { 'totalQuantity': 3 }
 */

//function to calculate total quantity of item in the cart.
function calculateQuantity() {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    total = total + cart[i].quantity;
  }
  return total;
}

//Endpoint
app.get('/cart/total-quantity', (req, res) => {
  let totalQuantity = calculateQuantity();
  res.json({ totalQuantity });
});

/**
 * Endpoint 6: Calculate Total Price of Items in the Cart
 * Objective: Calculate and return the total price of items in the cart based on their quantities and individual prices.
 * Endpoint: /cart/total-price
 * Your Task: Create a function that will calculate the total price of items in the cart.
 * Example Call: http://localhost:3000/cart/total-price
 * Expected Output:{ 'totalPrice': 90000 }
 */
//function that will calculate the total price of items in the cart.
function calculateTotalPrice() {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    total = total + cart[i].price * cart[i].quantity;
  }
  return total;
}
//Endpoint
app.get('/cart/total-price', (req, res) => {
  let totalPrice = calculateTotalPrice();
  res.json({ totalPrice });
});

// app.get('/', (req, res) => {
//   res.sendFile(resolve(__dirname, 'pages/index.html'));
// });
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
