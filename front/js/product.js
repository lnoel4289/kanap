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

// Définir les noeuds à surveiller
let colorSelector = document.getElementById('colors')
let quantitySelector = document.getElementById('itemQuantity')
let addToCartButton = document.getElementById('addToCart')

// Définir les membres du tableau currentProduct
let productQuantity = quantitySelector.value
let productColor = colorSelector.value

// Modifier l'array 'currentProduct' lorsqu'un évênement se produit
colorSelector.addEventListener('input', function(e) {
    productColor = e.target.value
})
quantitySelector.addEventListener('change', e => productQuantity = e.target.value)

// On définit cart
let cart = localStorage.getItem("cart")
if(cart == null) {
    cart = [];
} else {
    cart = JSON.parse(cart)
}
console.log(cart) //monitor

// Si on clique sur le bouton, on essaie d'ajouter 'currentProduct' au 'cart' en gérant les exceptions
addToCartButton.addEventListener('click', () => {
    let currentProduct = {
        id: productId,
        color: productColor, 
        quantity: productQuantity
    }
    if(currentProduct.color == '') {
        alert('Veuillez choisir choisir une couleur')
    } else if(currentProduct.quantity < 1) {
        alert('Veuillez indiquer le nombre d\'articles souhaités')
    } else if(currentProduct.quantity > 100) {
        alert('Vous ne pouvez pas dépasser un total de 100 articles !')
    // } else if(currentProduct.id == 'a557292fe5814ea2b15c6ef4bd73ed83' && currentProduct.color == 'Pink') {
    //      cart[0].quantity += currentProduct.quantity
    //      localStorage.setItem("cart", JSON.stringify(cart))
    } else {
        cart.push(currentProduct)
        localStorage.setItem("cart", JSON.stringify(cart))
    }   
})

// Ajouter le produit en cours dans la panier du LS(get/set)
function addToCart() {
    
}

// Sauver le panier dans le LS
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart))
}

// Récupérer le panier du LS
function getCart() {
    let cart = localStorage.getItem("cart")
    console.log(cart)
    if(cart == null) {
        return []
    } else {
        return JSON.parse(cart)
    }
}

// Vérifier si un produit identique est déjà dans le panier (id et couleur identiques)
// function addToCart(cart) {
//     for (let product of cart) {
//         if (product[0] == currentProduct[0] && product[1] == currentProduct[1]) {
//             increaseProductQuantity(product, currentProduct)
//         }
//         pushToCart(currentProduct)
    
//         console.table(cart) // monitor
//     }
// }

// Fonction incrémenter le produit existant
// function increaseProductQuantity(product) {
//     product[2] += currentProduct[2]
// }

// END