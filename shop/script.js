
let itemBox = document.getElementById('items');
let categoryStatus = 'all';
let products;
let range0_25 = false;
let range25_50 = false;
let range50_100 = false;
let range100 = false;


function checkLogin() {
  if (!localStorage.getItem('token')) {
    alert("Please login first");
    window.location.href = '/login';
  }
}
checkLogin();

function fetchProducts() {
  return new Promise((resolve, reject) => {
    fetch("https://fakestoreapi.com/products").then((res) => {
      return res.json();
    }).then((data) => {
      resolve(data);
    }).catch((err) => {
      reject(err);
    });
  });
}

function removeActiveClass() {
  document.getElementById("all").setAttribute('class', 'filter');
  document.getElementById("mens").setAttribute('class', 'filter');
  document.getElementById("womens").setAttribute('class', 'filter');
  document.getElementById("jewellery").setAttribute('class', 'filter');
  document.getElementById("electronics").setAttribute('class', 'filter');
}

function allProducts(e) {
  categoryStatus = 'all';
  removeActiveClass();
  e.setAttribute('class', 'filter active');
  filterCategory();
}

function onlyMens(e) {
  categoryStatus = "men's clothing";
  removeActiveClass();
  e.setAttribute('class', 'filter active');
  filterCategory();
}

function onlyWomens(e) {
  categoryStatus = "women's clothing";
  removeActiveClass();
  e.setAttribute('class', 'filter active');
  filterCategory();
}

function onlyJewellery(e) {
  categoryStatus = 'jewelery';
  removeActiveClass();
  e.setAttribute('class', 'filter active');
  filterCategory();
}

function onlyElectronics(e) {
  categoryStatus = 'electronics';
  removeActiveClass();
  e.setAttribute('class', 'filter active');
  filterCategory();
}

fetchProducts().then((data) => {
  products = data;
  localStorage.setItem('products', JSON.stringify(products));
  showProductOnScreen(products);
}).catch((err) => {
  console.log("Error while fetching products : ", err);
});

function filterCategory() {
  if (categoryStatus == "all") return filterRating(products);
  let finalProducts = products.filter((elem) => {
    if (elem.category == categoryStatus) return true;
    return false;
  });
  return filterRating(finalProducts);
}
function filterRating(finalProducts) {
  let rate = document.getElementById("range").value;
  if (rate == 0) return filterText(finalProducts);
  let filteredByRating = finalProducts.filter((elem) => {
    if (Math.round(elem.rating.rate) == rate) return true;
    return false;
  });
  return filterText(filteredByRating);
}

function filterText(filteredByRating) {
  let searchText = document.getElementById("search").value;
  if (searchText == "") return filterRange(filteredByRating);
  let filteredByText = filteredByRating.filter((elem) => {
    if (elem.title.toLowerCase().includes(searchText.toLowerCase())) return true;
    return false;
  });
  return filterRange(filteredByText);
}

function filterRange(filteredByText) {
  if (!range0_25 && !range25_50 && !range50_100 && !range100) return showProductOnScreen(filteredByText);
  let filteredByRange = filteredByText.filter((elem) => {
    if (f1(elem) || f2(elem) || f3(elem) || f4(elem)) return true;
    return false;
  });
  return showProductOnScreen(filteredByRange);
  function f1(elem) {
    if (!range0_25) { return false; }
    else if (elem.price >= 0 && elem.price <= 25) {
      return true;
    }
    return false;
  }
  function f2(elem) {
    if (!range25_50) { return false; }
    else if (elem.price >= 25 && elem.price <= 50) {
      return true;
    }
    return false;
  }
  function f3(elem) {
    if (!range50_100) { return false; }
    else if (elem.price >= 50 && elem.price <= 100) {
      return true;
    }
    return false;
  }
  function f4(elem) {
    if (!range100) { return false; }
    else if (elem.price >= 100) {
      return true;
    }
    return false;
  }
}

function showProductOnScreen(finalProducts) {

  if (finalProducts.length === 0) {
    itemBox.innerHTML = `<p>Oops,No products found for this filtering, try different combinations!</p>`;
    return;
  }
  let output = '';

  finalProducts.forEach((product) => {
    output += `<div class="item" >
    <img src="${product.image}" alt="Item" />
    <div class="info">
    <div><h3 style="text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;">${product.title}</h3></div>
      <div class="row">
        <div class="price">${product.price}$</div>
        <div class="sized">S,M,L</div>
      </div>
      <div class="colors">
        Colors:
        <div class="row">
          <div class="circle" style="background-color: #000"></div>
          <div class="circle" style="background-color: #4938af"></div>
          <div class="circle" style="background-color: #203d3e"></div>
        </div>
      </div>
      <div class="row">Rating: ${product.rating.rate}</div>
    </div>
    <button id="addBtn" onclick='addToCart(this, ${product.id})'>Add to Cart</button>
  </div> `
  });
  itemBox.innerHTML = output;
}


function addToCart(event, id) {
  if (event.innerHTML == "Added") return;
  event.innerText = "Added";
  //console.log(id);
  products.forEach((elem) => {
    if (elem.id == id) {
      let cart = localStorage.getItem("cart");
      if (!cart) { cart = [elem]; }
      else {
        cart = JSON.parse(cart);
        cart.push(elem);
      }
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  });
}

document.getElementById("search").addEventListener("keyup", () => {
  return filterCategory();
})

function setRange(res) {
  if (res == "0-25") range0_25 = !range0_25;
  else if (res == "25-50") range25_50 = !range25_50;
  else if (res == "50-100") range50_100 = !range50_100;
  else if (res == "100on") range100 = !range100;
  return filterCategory();
}








