// Link for the documentation:
// https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/build-integration

// Add button code documentation:
// https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/build-integration#code-to-add-pay-button


function checkLogin() {
  if (!localStorage.getItem('token')) {
    alert("Please login first");
    window.location.href = '/login';
  }
}

checkLogin();

let cartBox = document.getElementById('cartItems');
let checkoutBox = document.getElementById('checkoutBox');
let products;
let total;

function showCartItem() {
  let cart = JSON.parse(localStorage.getItem('cart'));
  if (!cart) {
    cartBox.innerHTML = `
    <div>
        <h6 style="font-size: 30px">Oops, No items in cart.</h6>
    </div>`;
  } else {
    if (cart.length === 0) {
      cartBox.innerHTML = `
    <div>
        <h6 style="font-size: 30px">Oops, No items in cart.</h6>
    </div>`;
      return;
    }
    products = cart;
    let check = "";
    let result = "";
    check += `<h4>Checkout List</h4>`;
    let cartTotal = 0;
    cart.forEach((item, i) => {
      cartTotal += item.price;
      check += `
    <div style="display:flex; justify-content: space-between; width: 90%">
    <h6 style="text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;">${i + 1}. ${item.title}</h6>
    <h6>${item.price}$</h6>
    </div>
    `;
      result += `<div class="item" >
      <img src="${item.image}" alt="Item" />
      <div class="info">
      <div><h3 style="text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;">${item.title}</h3></div>
          <div class="price">${item.price}$</div>
      </div>
      <button id="addBtn" onclick='removeCart(this, ${item.id})'>Remove From Cart</button>
      </div> `;
    });
    check += `
            <hr style="width: 100%"/>
            <div style="display:flex; justify-content: space-between; width: 90%">
            <h4>Total</h4>
            <h4  id="total">${Math.round(cartTotal)}$</h4>
            </div>
            <hr style="width: 100%"/>
            <button id="checkoutBtn" style="width:90%; height: 40px; border-radius:0; border: none; margin-top: 20px; margin-bottom: 20px;">Click to Checkout</button>
            `;
    document.getElementById("checkoutBox").innerHTML = check;
    cartBox.innerHTML = result;
    total = cartTotal;
  }
}
showCartItem();


function removeCart(event, id) {
  event.innerHTML = "Removed";
  products.forEach((element, index, object) => {
    if (element.id == id) object.splice(index, 1);
  });
  localStorage.setItem("cart", JSON.stringify(products));
  showCartItem();
}

document.getElementById("checkoutBtn").onclick = function (e) {
  var options = {
    key: "rzp_test_PV1oQ0oMtgXOsq", // Enter the Key ID generated from the Dashboard
    amount: (Math.round(total) * 100), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: "USD",
    name: "MyShop Checkout",
    description: "This is your order", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    theme: {
      color: "#000",
    },
    image:
      "https://www.mintformations.co.uk/blog/wp-content/uploads/2020/05/shutterstock_583717939.jpg",
  };

  var rzpy1 = new Razorpay(options);
  rzpy1.open();
  // clear mycart - localStorage
  localStorage.removeItem('cart');
  showCartItem();
  e.preventDefault();
};

