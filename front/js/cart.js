// Appeler le cart du LS
function getCart() {
  let cart = localStorage.getItem("cart");
  if(cart == null || cart == [] || cart == undefined) {
      document.querySelector('h1').textContent = 'Votre panier est vide'
  } else {
      return JSON.parse(cart)
  }
}

// Sauvegarder le panier dans le LS
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart))
}

// Afficher les items du cart
function displayItems() {
  let cart = getCart();
  for(let item of cart) {
    fetch(`http://localhost:3000/api/products/${item.id}`)
    .then(res => res.json())
    .then((product) => {
      document.getElementById('cart__items').innerHTML +=`<article class="cart__item" data-id="${product._id}" data-color="${item.color}">
        <div class="cart__item__img">
          <img src="${product.imageUrl}" alt="${product.altTxt}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${product.name}</h2>
            <p>${item.color}</p>
            <p>${product.price} €</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${item.quantity}">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article>`
    })
    .catch(() => document.querySelector('h1').textContent = 'Serveur indisponible')
    .then(() => console.log('affichage terminé'))
  }
}
displayItems()

// Chainer l'affichage des items avec la surveillance des évênements




// Supprimer un produit

// let point = document.querySelector('h1');
// console.log(point);
// point.addEventListener('click', function() {
//   console.log(cart)})
// cart = cart.filter(p => p.id != item.id || p.color != item.color);
// console.log(cart)
// saveCart(cart)});


// Modifier la quantité
// Calculer la quantité totale
function calculateTotalQuantity() {
  
}
// Calculer le prix total
function calculateTotalPrice() {
  
}

// Afficher la quantité totale
function TotalQuantity() {
  document.getElementById('totalQuantity').textContent = ''
}
// Afficher le prix total
function TotalPrice() {
  document.getElementById('totalPrice').textContent = ''
}



// FORMULAIRE --------------------------

// Points de surveillance
let firstName = document.getElementById('firstName')
let lastName = document.getElementById('lastName')
let address = document.getElementById('address')
let city = document.getElementById('city')
let email = document.getElementById('email')

// Réponses
let firstNameErrorMsg = document.getElementById('firstNameErrorMsg')
let lastNameErrorMsg = document.getElementById('lastNameErrorMsg')
let addressErrorMsg = document.getElementById('addressErrorMsg')
let cityErrorMsg = document.getElementById('cityErrorMsg')
let emailErrorMsg = document.getElementById('emailErrorMsg')


//  VERS CONFIRMATION


// + sort items
