displayCart();

// Afficher la page panier
async function displayCart() {
  await displayItems();
  itemToDelete();
  quantityToChange();
  totalQuantity();
  totalPrice();
};

// Afficher les items du panier
async function displayItems() {
  let cart = getCart();
  for(let kanap of cart) {
    await displayItem(kanap)
  }
};

// Appeler le panier du LS
function getCart() {
  let cart = localStorage.getItem("cart");
  if(cart == null || cart == [] || cart == undefined) {
      document.querySelector('h1').textContent = 'Votre panier est vide'
  } else {
      return JSON.parse(cart)
  }
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

// Surveiller les produits supprimables
function itemToDelete() {
  let tousLesSupprimer = document.querySelectorAll('.deleteItem');
  for (let supprimer of tousLesSupprimer) {
    supprimer.addEventListener('click', () => removeItem(supprimer))
  }
};

// Supprimer le produit du dom
function removeItem(bidule) {
  let cartItem = bidule.closest('.cart__item');
  cartItem.remove();
  deleteItemFromCart(cartItem)
};

// Supprimer le produit du localstorage
function deleteItemFromCart(trucASup) {
  let cart = getCart();
  cart = cart.filter(p => p.id != trucASup.dataset.id || p.color != trucASup.dataset.color);
  saveCart(cart);
  totalQuantity();
  totalPrice();
};
// Indiquer lorsque le panier est vide
// Gérer l'erreur lorsque cart est null
// Afficher panier vide lors de la suppression du dernier article

// Sauvegarder le panier dans le LS
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart))
};

// Surveiller les quantités modifiables
function quantityToChange() {
  let toutesLesQte = document.querySelectorAll('.itemQuantity');
  for (let qte of toutesLesQte) {
    qte.addEventListener('change', () => modifyQuantityToCart(qte));
  }
};

// Modifier la quantité d'un produit
function modifyQuantityToCart(qte) {
  let cartItem = qte.closest('.cart__item');
  let cart = getCart();
  let foundItem = cart.find(p => p.id == cartItem.dataset.id && p.color == cartItem.dataset.color);
  checkLegalQtyValue(qte);
  foundItem.quantity = Number(qte.value);
  saveCart(cart);
  totalQuantity();
  totalPrice();
};

function checkLegalQtyValue(num) {
  if(num.value < 1) {
    num.value = 1
  } else if(num.value > 100) {
    num.value = 100
  }
}
// Gérer aussi le fait que les nombres doivent être entiers (voir également sur product.js)
// Gérer aussi le fait qu on peut dépasser 100 en ajoutant depuis la page product

// Afficher la quantité totale
function totalQuantity() {
  let cart = getCart();
  let totalQuantity = 0;
  cart.forEach(calculateTotalQuantity);
  function calculateTotalQuantity(item) {
    totalQuantity += item.quantity;
  };
  document.getElementById('totalQuantity').textContent = totalQuantity;
};

// Affucher le prix total
function totalPrice() {
  let totalPrice = 0;
  let cartItems = document.querySelectorAll('.cart__item');
  cartItems.forEach(calculateTotalPrice);
  function calculateTotalPrice(cartItem) {
    let quantity = cartItem.querySelector('.itemQuantity').value;
    let price = cartItem.querySelector('h2 + p + p > span').textContent;
    totalPrice += quantity*price
  }
  document.getElementById('totalPrice').textContent = totalPrice
};



// FORMULAIRE --------------------------

// Points de surveillance
let firstName = document.getElementById('firstName');
let lastName = document.getElementById('lastName');
let address = document.getElementById('address');
let city = document.getElementById('city');
let email = document.getElementById('email');
let order = document.getElementById('order');

// Réponses
let firstNameErrorMsg = document.getElementById('firstNameErrorMsg');
let lastNameErrorMsg = document.getElementById('lastNameErrorMsg');
let addressErrorMsg = document.getElementById('addressErrorMsg');
let cityErrorMsg = document.getElementById('cityErrorMsg');
let emailErrorMsg = document.getElementById('emailErrorMsg');




//  VERS CONFIRMATION


// + sort items