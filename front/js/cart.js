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
  .then(res => console.log(res)) // monitor
  .then(function() {
    console.log('coucou')
  })
  .then(() => cart.find(elt => elt.id = 'a6ec5b49bd164d7fbe10f37b6363f9fb'))
  .then(elt => console.log(elt))
  .catch(() => document.querySelector('h1').textContent = 'Erreur inattendue')

  
// // test find
// let found = cart.find(elt => elt.id = 'a6ec5b49bd164d7fbe10f37b6363f9fb')
// console.log(found) // monitor


// Récupérer les produits par une requête
// fetch('http://localhost:3000/api/products/')
// .then((res) => res.json)
// .then((products) => {
//   for(let item of cart) {
//     products.find(product => 
//     product._id == item.id);
//     console.log('ye')
//     displayProduct(product)
//   }
// })
// .catch((err) => {
// console.log(err)
// })

// Trouver dans les products (requête) le produit correspondant au produit du cart
// cart vs products

// Afficher chaque produits identifié ainsi (for of)

// Affichage de la section panier

// Fonction afficher le panier
function displayCart() {

}




// Afficher le produit
function displayProduct(prod) {
  document.getElementById('cart__items').innerHTML +=`<article class="cart__item" data-id="${prod.id}" data-color="${prod.color}">
        <div class="cart__item__img">
          <img src="../images/product01.jpg" alt="Photographie d'un canapé">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>Nom du produit</h2>
            <p>${prod.color}</p>
            <p>42,00 €</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${prod.quantity}">
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
