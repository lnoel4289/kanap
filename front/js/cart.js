// Appeler le cart du LS
let cart = localStorage.getItem("cart")
if(cart == null || cart == [] || cart == undefined) {
    document.querySelector('h1').textContent = 'Votre panier est vide'
} else {
    cart = JSON.parse(cart)
    console.log(cart) // monitor
}

// Appeler product dans l'API
function display() {
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
  }
}
display() // test

// MODIFIER LE PANIER
// Modifier la quantité
// Supprimer un produit


// FORMULAIRE

//  VERS CONFIRMATION
