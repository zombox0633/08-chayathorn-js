let idProduct = 0;
let totalAmount = 0;
let cartProducts = [];
let transactionItems = [];

function createProduct(event) {
  event.preventDefault();

  const inputName = document.getElementById("create-input-name").value.trim();
  const inputPrice = document.getElementById("create-input-price").value.trim();
  const inputQuantity = document
    .getElementById("create-input-quantity")
    .value.trim();
  const inputURL = document.getElementById("create-input-url").value.trim();

  const existingProduct = cartProducts.find(
    (product) =>
      product.name === inputName &&
      product.price === inputPrice &&
      product.url === inputURL
  );

  if (existingProduct) {
    existingProduct.quantity =
      parseInt(existingProduct.quantity) + parseInt(inputQuantity);
  } else {
    const objProduct = {
      id: idProduct,
      name: inputName,
      price: inputPrice,
      quantity: inputQuantity,
      url: inputURL,
    };
    cartProducts.push(objProduct);
    idProduct++;
  }

  renderCartItems();
}

function renderCartItems() {
  const containerCart = document.getElementById("container-cart");
  containerCart.innerHTML = "";

  if (cartProducts.length === 0) {
    containerCart.innerHTML = `
    <div class="h-80 flex flex-col justify-center items-center">
      <h1>🤔 😖 😏</h1>
    </div>
    `;
    return;
  }

  cartProducts.forEach((item) => {
    const productFormat = `
    <div id={product-${item.id}} class="flex gap-x-8 p-4">
      <input type="checkbox" data-product-id="${item.id}" />
      <div class="flex w-full border-2 border-black p-4">
        <div class="h-44 min-w-44">
          <img
            class="h-full border-4 border-black"
            src="${item.url}"
            alt="${item.name}"
          />
        </div>
        <div class="w-full flex justify-between">
          <div>
            <h4>Name: ${item.name}</h4>
            <p>Price: $${item.price}</p>
            <p>Quantity: ${item.quantity}</p>
          </div>
        </div>
      </div>
    </div>
  `;

    containerCart.insertAdjacentHTML("afterbegin", productFormat);
  });
}

//SELECT
function selectAllProducts() {
  const checkboxes = document.querySelectorAll(
    "#container-cart input[type='checkbox']"
  );

  checkboxes.forEach((checkbox) => {
    if (!checkbox.checked) {
      checkbox.checked = true;
    }
  });
}

function deselectAllProducts() {
  const checkboxes = document.querySelectorAll(
    "#container-cart input[type='checkbox']"
  );

  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      checkbox.checked = false;
    }
  });
}

//SUBMIT
function addToTransaction() {
  const checkboxes = document.querySelectorAll(
    "#container-cart input[type='checkbox']"
  );

  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      const productId = parseInt(checkbox.dataset.productId);
      const selectProduct = cartProducts.find(
        (product) => product.id === productId
      );

      const isProductInTransaction = transactionItems.find(
        (product) => product.id === productId
      );

      if (selectProduct && !isProductInTransaction) {
        transactionItems.push(selectProduct);
      } else if (isProductInTransaction && selectProduct) {
        alert(`Product "${selectProduct.name}" is already in the transaction.`);
      }
    }
  });
  renderCartItems();
  renderTransaction();
}

//REMOVE TO CART
function removeFromCart() {
  const checkboxes = document.querySelectorAll(
    "#container-cart input[type='checkbox']"
  );

  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      const productId = parseInt(checkbox.dataset.productId);
      cartProducts = cartProducts.filter((product) => product.id !== productId);
    }
  });

  renderCartItems();
}

//renderTransaction
function renderTransaction() {
  const containerTransaction = document.getElementById("container-transaction");
  const totalAmountElement = document.getElementById("total-amount");
  containerTransaction.innerHTML = "";

  totalAmount = 0;
  totalAmountElement.innerHTML = "<h1>Total Amount: $0</h1>";

  if (transactionItems.length === 0) {
    containerTransaction.innerHTML = `
    <div class="h-80 flex flex-col justify-center items-center">
        <h1>😗</h1>
    </div>
    `;
  }

  transactionItems.forEach((product) => {
    const totalPrice = product.price * product.quantity;
    const productFormat = `
      <div
        id="{transaction-${product.id}}"
        data-transaction-id="${product.id}"
        class="flex gap-x-8"
      >
        <div class="flex w-full border-2 border-black p-4">
          <div class="h-44 min-w-44">
            <img
              class="h-full border-4 border-black"
              src="${product.url}"
              alt="${product.name}"
            />
          </div>
          <div class="w-full flex justify-between">
            <div>
              <h4>Name: ${product.name}</h4>
              <p>Price per unit: $${product.price}</p>
              <p>Quantity: ${product.quantity}</p>
              <p>Total price: $${totalPrice}</p>
            </div>
            <div class="flex items-end">
              <button type="button" onclick="removeProductFromTransaction(${product.id})" class="bth">
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    totalAmount += totalPrice;
    containerTransaction.insertAdjacentHTML("afterbegin", productFormat);
  });

  totalAmountElement.textContent = `Total Amount: $${totalAmount}`;
}

function submitTransaction() {
  if (transactionItems.length > 0) {
    alert(`Please pay $${totalAmount} for the items you ordered.`);
    totalAmount = 0;
    cartProducts = [];
    transactionItems = [];
  }

  renderCartItems();
  renderTransaction();
}

function removeProductFromTransaction(id) {
  transactionItems = transactionItems.filter((product) => product.id !== id);
  renderTransaction();
}
