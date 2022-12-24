// Affichage de la section panier
let cart = localStorage.getItem("cart")
if(cart == null || cart == [] || cart == undefined) {
    document.querySelector('h1').textContent = 'Votre panier est vide'
} else {
    cart = JSON.parse(cart)
    console.table(cart) // monitor
    displayCart(cart)
}

// Fonction afficher le panier
function displayCart(cart) {
  for(let prod of cart) {
    displayProduct(prod)
  }
}

// Fonction requérir le produit par son id
function getProductToDisplay() {
  let product = fetch(`http://localhost:3000/api/products/${id}`)
  
}

// Afficher le produit
function displayProduct() {
  document.getElementById('cart__items').innerHTML +=`<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
        <div class="cart__item__img">
          <img src="../images/product01.jpg" alt="Photographie d'un canapé">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>Nom du produit</h2>
            <p>Vert</p>
            <p>42,00 €</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article>`
}

