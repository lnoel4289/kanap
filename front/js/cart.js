// Appeler le cart du LS
let cart = localStorage.getItem("cart")
if(cart == null || cart == [] || cart == undefined) {
    document.querySelector('h1').textContent = 'Votre panier est vide'
} else {
    cart = JSON.parse(cart)
    console.log(cart) // monitor
}

// Appeler Products dans l'API
fetch('http://localhost:3000/api/products/')
  .then(res => res.json())
  .then((products) => {
    for(let item of cart) {
      products.find(function(product) {
        if(product._id == item.id) {
          displayProduct(product)
        }
      })
    }
  })

// Afficher le produit (à revoir)
function displayProduct(product) {
  document.getElementById('cart__items').innerHTML +=`<article class="cart__item" data-id="${product._id}" data-color="${product.color}">
        <div class="cart__item__img">
          <img src="../images/product01.jpg" alt="Photographie d'un canapé">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>Nom du produit</h2>
            <p>${product.color}</p>
            <p>42,00 €</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article>`
}

// MODIFIER LE PANIER
// Modifier la quantité
// Supprimer un produit


// FORMULAIRE

//  VERS CONFIRMATION
