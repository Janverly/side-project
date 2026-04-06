
// Initial cart data
let cartData = [
  { name: "Fresh Apples", price: 120, qty: 2, img: "img/apple.png" },
  { name: "Bananas", price: 80, qty: 1, img: "img/banana.png" },
  { name: "Fresh Milk", price: 150, qty: 1, img: "img/milk.png" }
];

const SHIPPING_FEE = 150;


const cartContainer = document.getElementById("cartContainer");
const itemCountEl = document.getElementById("itemCount");
const shippingFeeEl = document.getElementById("shippingFee");
const totalAmountEl = document.getElementById("totalAmount");
const checkoutBtn = document.getElementById("checkoutBtn");
const shippingForm = document.getElementById("shippingForm");


const newName = document.getElementById("newName");
const newPrice = document.getElementById("newPrice");
const newQty = document.getElementById("newQty");
const newImg = document.getElementById("newImg");
const addItemBtn = document.getElementById("addItemBtn");

function createCartItemDOM(item, index) {
  const cartItem = document.createElement("div");
  cartItem.className = "cart-item";
  cartItem.dataset.price = item.price;
  cartItem.dataset.qty = item.qty;

  const img = document.createElement("img");
  img.src = item.img;
  img.alt = item.name;

  const details = document.createElement("div");
  details.className = "item-details";

  const name = document.createElement("p");
  name.className = "item-name";
  name.textContent = item.name;

  const price = document.createElement("p");
  price.className = "item-price";
  price.textContent = `₱${item.price}.00`;

  details.appendChild(name);
  details.appendChild(price);

  const qtyInput = document.createElement("input");
  qtyInput.type = "number";
  qtyInput.min = 0;
  qtyInput.value = item.qty;
  qtyInput.className = "qty-input";

  qtyInput.addEventListener("input", (e) => {
    cartData[index].qty = +e.target.value;
    updateOrderSummary();
  });

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.addEventListener("click", () => {
    const newQtyValue = prompt("Enter new quantity", cartData[index].qty);
    if (newQtyValue !== null) {
      cartData[index].qty = +newQtyValue;
      renderCart();
    }
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", () => {
    cartData.splice(index, 1);
    renderCart();
  });

  cartItem.appendChild(img);
  cartItem.appendChild(details);
  cartItem.appendChild(qtyInput);
  cartItem.appendChild(editBtn);
  cartItem.appendChild(deleteBtn);

  return cartItem;
}

function renderCart() {
  cartContainer.innerHTML = "";
  cartData.forEach((item, index) => {
    const cartItemDOM = createCartItemDOM(item, index);
    cartContainer.appendChild(cartItemDOM);
  });
  updateOrderSummary();
}

function calculateTotals() {
  let totalItems = 0;
  let subtotal = 0;
  cartData.forEach(item => {
    totalItems += item.qty;
    subtotal += item.qty * item.price;
  });
  return { totalItems, subtotal, totalAmount: subtotal + SHIPPING_FEE };
}

function updateOrderSummary() {
  const totals = calculateTotals();
  itemCountEl.textContent = totals.totalItems;
  shippingFeeEl.textContent = `₱${SHIPPING_FEE.toFixed(2)}`;
  totalAmountEl.textContent = `₱${totals.totalAmount.toFixed(2)}`;
}

addItemBtn.addEventListener("click", () => {
  if (!newName.value || !newPrice.value || !newQty.value || !newImg.value) {
    alert("Please fill out all new item fields");
    return;
  }
  cartData.push({
    name: newName.value,
    price: +newPrice.value,
    qty: +newQty.value,
    img: newImg.value
  });
  newName.value = "";
  newPrice.value = "";
  newQty.value = "";
  newImg.value = "";
  renderCart();
});

checkoutBtn.addEventListener("click", () => {
  if (!shippingForm.checkValidity()) {
    alert("Please fill out all required shipping information!");
    return;
  }
  const shippingData = new FormData(shippingForm);
  const shippingInfo = {};
  shippingData.forEach((value, key) => shippingInfo[key] = value);

  const totals = calculateTotals();
  alert(`Checkout Successful!
Name: ${shippingInfo.firstName} ${shippingInfo.lastName}
Address: ${shippingInfo.address1}, ${shippingInfo.address2 || ""}
${shippingInfo.city}, ${shippingInfo.state} ${shippingInfo.zip}

Total Items: ${totals.totalItems}
Shipping Fee: ₱${SHIPPING_FEE}
Total Amount: ₱${totals.totalAmount}
Thank you for your order!`);
});


document.addEventListener("DOMContentLoaded", () => {
  renderCart();
});
