// INITIALISATION DE LA PAGE

emptiedCart();
displayCart();

//  Votre panier est vide
function emptiedCart() {
  let cart = getCart();
  if(cart == "" || cart == undefined || cart == null || cart == []) {
    document.querySelector('h1').textContent = 'Votre panier est vide';
    document.querySelector('.cart__order').style.display = 'none';
  }
};

// Afficher la page panier
async function displayCart() {
  await displayItems();
  itemToDelete();
  quantityToChange();
  totalQuantity();
  totalPrice();
};

// Afficher tous les items du panier
async function displayItems() {
  let cart = getCart();
  for(let kanap of cart) {
    await displayItem(kanap)
  };
};

// Appeler le panier du LS
function getCart() {
  let cart = localStorage.getItem("cart");
  if(cart == null || cart == undefined || cart =='' || cart == []) {
    document.querySelector('h1').textContent = 'Votre panier est vide';
    return [];
  } else {
    return JSON.parse(cart);
  };
};

// Afficher un item du panier
async function displayItem(item) {
await fetch(`http://localhost:3000/api/products/${item.id}`)
  .then(res => res.json())
  .then(product => displayProduct(product, item))
  .catch(() => document.querySelector('h1').textContent = 'Serveur indisponible')
};

// Fonction affichant le produit
function displayProduct(prod, itm) {
  document.getElementById('cart__items').innerHTML +=`<article class="cart__item" data-id="${prod._id}" data-color="${itm.color}">
      <div class="cart__item__img">
        <img src="${prod.imageUrl}" alt="${prod.altTxt}">
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__description">
          <h2>${prod.name}</h2>
          <p>${itm.color}</p>
          <p><span>${prod.price}</span> €</p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
            <p>Qté : </p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${itm.quantity}">
          </div>
          <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
          </div>
        </div>
      </div>
    </article>`;
};

//  FIN INITIALISATION DE LA PAGE


// DYNAMISME DE LA PAGE

// Surveiller les produits supprimables
function itemToDelete() {
  let AllSupprimer = document.querySelectorAll('.deleteItem');
  for (let supprimer of AllSupprimer) {
    supprimer.addEventListener('click', () => removeItem(supprimer))
  }
};

// Supprimer le produit du dom
function removeItem(remoteDelete) {
  let itemNode = remoteDelete.closest('.cart__item');
  itemNode.remove();
  deleteItemFromCart(itemNode);
};

// Supprimer le produit du localstorage
function deleteItemFromCart(deletedNode) {
  let cart = getCart();
  cart = cart.filter(p => p.id != deletedNode.dataset.id || p.color != deletedNode.dataset.color);
  saveCart(cart);
  emptiedCart();
  totalQuantity();
  totalPrice();
};

// Sauvegarder le panier dans le LS
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart))
};

// Surveiller les quantités modifiables
function quantityToChange() {
  let allQty = document.querySelectorAll('.itemQuantity');
  for (let qty of allQty) {
    qty.addEventListener('change', () => modifyQuantityToCart(qty));
  }
};

// Modifier la quantité d'un produit
function modifyQuantityToCart(qty) {
  let cartItem = qty.closest('.cart__item');
  let cart = getCart();
  let foundItem = cart.find(p => p.id == cartItem.dataset.id && p.color == cartItem.dataset.color);
  checkLegalQtyValue(qty);
  foundItem.quantity = Number(qty.value);
  saveCart(cart);
  totalQuantity();
  totalPrice();
};

// La modification ne peut dépasser 100
function checkLegalQtyValue(num) {
  if(num.value < 1) {
    num.value = 1;
  } else if(num.value > 100) {
    num.value = 100;
  } else if(Number.isInteger(num.value) != true) {
    num.value = Math.floor(num.value);
  }
}

// Afficher la quantité totale
function totalQuantity() {
  let cart = getCart();
  let totalQuantity = 0;
  cart.forEach(addQtyToTotal);
  function addQtyToTotal(item) {
    totalQuantity += item.quantity;
  };
  document.getElementById('totalQuantity').textContent = totalQuantity;
};

// Afficher le prix total
function totalPrice() {
  let totalPrice = 0;
  let cartItems = document.querySelectorAll('.cart__item');
  cartItems.forEach(addPriceToTotal);
  function addPriceToTotal(cartItem) {
    let quantity = cartItem.querySelector('.itemQuantity').value;
    let price = cartItem.querySelector('h2 + p + p > span').textContent;
    totalPrice += quantity*price
  }
  document.getElementById('totalPrice').textContent = totalPrice
};