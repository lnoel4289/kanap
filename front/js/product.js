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
console.log(cart) // monitor

// Définir les noeuds à surveiller
let colorSelector = document.getElementById('colors')
let quantitySelector = document.getElementById('itemQuantity')
let addToCartButton = document.getElementById('addToCart')

// Définir les membres du tableau currentProduct
let productQuantity = quantitySelector.value
let productColor = colorSelector.value

// Définir currentProduct à ajouter au tableau panier
// let currentProduct = {
//     id: productId,
//     color: productColor,
//     quantity: productQuantity
// }

class CurrentProduct {
    constructor(id, color, quantity) {
        this.id = id;
        this.color = color;
        this.quantity = quantity;
    }
}

let currentProduct = new CurrentProduct (productId, productColor, productQuantity)
console.table (currentProduct) // monitor

// Modifier l'array 'currentProduct' lorsqu'un évênement se produit
colorSelector.addEventListener('input', function(e) {
    currentProduct.color = e.target.value
    console.table (currentProduct) // monitor
    console.table (cart) // monitor
})
quantitySelector.addEventListener('change', e => currentProduct.quantity = e.target.value)

// Si on clique sur le bouton, on essaie d'ajouter 'currentProduct' au 'cart' en gérant les exceptions
addToCartButton.addEventListener('click', () => {
    if(currentProduct.color == '') {
        alert('Veuillez choisir choisir une couleur')
    } else if(currentProduct.quantity < 1) {
        alert('Veuillez indiquer le nombre d\'articles souhaités')
    } else if(currentProduct.quantity > 100) {
        alert('Vous ne pouvez pas dépasser un total de 100 articles !')
    } else {
        cart.push(currentProduct)
        alert('Article(s) correctement ajouté(s) !')
        console.table(cart) // monitor
        }
    })



// Trouver le même prod
// function checkSameProduct(cart) {
//     for (let product of cart) {
//         if (product[0] == currentProduct[0] && product[1] == currentProduct[1]) {
//             product[2] += currentProduct[2]
//         }
//     }
// }

// Fonction vérifier si le mm produit existe dans le cart

// Il faut parcourir le 'cart' pour vérifier si un produit identique y est déjà (id et couleur identiques)
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

// // Fonction ajouter le produit en cours au panier
// function addNewProduct() {
//     cart.push(currentProduct)
// }

// Envoyer le JSON dans le local storage

// END