// Partie 1: Remplir la page produit en fonction de l'id du produit visité

// Récupérer l'id du produit dans l'url
const productId = new URL(document.location.href).searchParams.get('id')

// Requête (GET) product via l'id
const product = fetch(`http://localhost:3000/api/products/${productId}`)
    .then((res) => res.json())
    .then((product) => fillProductPage(product))
    .catch((error) => {
        document.getElementById('title').textContent = 'Impossible d\'afficher le produit'
    })

//  Fonction remplir la page
function fillProductPage(product) {
    displayPageTitle(product)
    displayProductSpecs(product)
    displayColorOptions(product)
}

//  Display page title
function displayPageTitle(product) {
    document.querySelector('head > title').textContent = product.name
}

// Afficher les informations du 'product' sur la page product.html
function displayProductSpecs(product) {
    const item = document.querySelector('.item')
    item.querySelector('img').src = product.imageUrl
    item.querySelector('img').alt = product.altTxt
    document.getElementById('title').textContent = product.name
    document.getElementById('price').textContent = product.price
    document.getElementById('description').textContent = product.description
}

// Add colors <options> in color selector
function displayColorOptions(product) {
    let colors = product.colors
    for (let color of colors) {
        document.getElementById('colors').innerHTML += `<option value="${color}">${color}</option>`
    }
}

// ::::::::::::::::::::::::::::::
// :: Partie 2: Vers le panier ::
// ::::::::::::::::::::::::::::::

// Créer un array panier
let cart = []
console.table(cart) // monitor

// Définir les noeuds à surveiller
let colorSelector = document.getElementById('colors')
let quantitySelector = document.getElementById('itemQuantity')
let addToCartButton = document.getElementById('addToCart')

// Définir les membres du tableau currentProduct
let productQuantity = quantitySelector.value
let productColor = colorSelector.value

// Définir currentProduct à ajouter au tableau panier
let currentProduct = [productId, productColor, productQuantity]
console.table (currentProduct) // monitor

// Fonctions modifiant l'array 'currentProduct'
function changeColor() {
    currentProduct[1] = productColor
    console.table(currentProduct) // monitor
}

// Modifier l'array 'currentProduct' lorsqu'un évênement se produit
colorSelector.addEventListener('input', function(e) {
    currentProduct[1] = e.target.value
    console.table(currentProduct) // monitor
    })

quantitySelector.addEventListener('input', function(e) {
    currentProduct[2] = e.target.value
    console.table(currentProduct) // monitor
    })

// Ajouter l'array 'currentProduct' à l'array 'cart' quand on clic sur le bouton
addToCartButton.addEventListener('click', addToCart(currentProduct))














// Fonction ajouter le produit en cours au panier
function addToCart(currentProduct) {
    cart.push(currentProduct)
}



// Il faut récupérer les infos actuellement affichées et les transmettre à la variable produit avant de push le produit dans le tableau

// Lorsqu’on ajoute un produit au panier, si celui-ci n'était pas déjà présent dans le panier, on ajoute un nouvel élément dans l’array

// Lorsqu’on ajoute un produit au panier, si celui-ci était déjà présent dans le panier (même id + même couleur), on incrémente simplement la quantité du produit correspondant dans l’array

// Si le nombre de produit ajouté est zéro ou si la couleur n'est pas définie, messages d'erreurs


// Envoyer le JSON dans le local storage

// END