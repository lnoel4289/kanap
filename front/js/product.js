// Partie 1: Remplir la page produit en fonction de l'id du produit visité

// Récupérer l'id du produit dans l'url
let productId = new URL(document.location.href).searchParams.get('id')

// Requête (GET) product via l'id
fetch(`http://localhost:3000/api/products/${productId}`)
    .then((res) => res.json())
    .then((product) => fillProductPage(product))
    .catch((error) => {
        document.getElementById('title').textContent = 'Impossible d\'afficher le produit demandé'
    })

//  Fonction remplir la page
function fillProductPage(product) {
    displayPageTitle(product)
    displaySpecs(product)
    displayColors(product)
}

//  Display page title
function displayPageTitle(product) {
    document.querySelector('head > title').textContent = product.name
}

// Afficher les informations du 'product' sur la page product.html
function displaySpecs(product) {
    const item = document.querySelector('.item')
    item.querySelector('img').src = product.imageUrl
    item.querySelector('img').alt = product.altTxt
    document.getElementById('title').textContent = product.name
    document.getElementById('price').textContent = product.price
    document.getElementById('description').textContent = product.description
}

// Add colors <options> in color selector
function displayColors(product) {
    let colors = product.colors
    for (let color of colors) {
        document.getElementById('colors').innerHTML += `<option value="${color}">${color}</option>`
    }
}

// Partie 2: Vers le panier

// Créer un array 'cart'
// cart est un array comprenant 0 ou plusieurs objets (produits)
let cart = []
cart.push('f') // test
console.table(cart) // monitor
console.log(JSON.stringify(cart)) // monitor


// Ecouter button
document.getElementById('addToCart').addEventListener('click', addToCart)
// Si le nombre de produit est zéro ou si la couleur n'est pas définie, message d'erreur
// button push produit dans cart
// cart.html affichera cart
// Mettre à jour le cart sans avoir besoin de rafraichir la page (POO?)

// Ajouter le produit en cours au panier
function addToCart(leProduit) {
    // les conditions
    cart.push(leProduit)
}



// Envoyer le JSON dans le local storage
// Une couleur différente indique que le produit est un autre produit même si l'id est le même.

//  Transmettre les données du local storage à la page panier (?)

// END

