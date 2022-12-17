// Partie 1: Remplir la page produit en fonction de l'id du produit visité

// Récupérer l'id du produit dans l'url
let productId = new URL(document.location.href).searchParams.get('id')

// Requête (GET) product via l'id
let product = fetch(`http://localhost:3000/api/products/${productId}`)
    .then((res) => res.json())
    .then((product) => fillProductPage(product))
    .catch((error) => {
        document.getElementById('title').textContent = 'Impossible d\'afficher le produit'
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


// ::::::::::::::::::::::::::::::
// :: Partie 2: Vers le panier ::  #joyeuxnoel
// ::::::::::::::::::::::::::::::

document.querySelector('#itemQuantity').addEventListener('input', (e) => {return e.target.value})

document.querySelector('#itemQuantity').addEventListener('input', function(e) {
    console.log (e.target.value)
    return e.target.value
    }
)

// document.querySelector('#colors').addEventListener('input', () => console.log (event.target.value))

let currentProduct = {
    id : productId,
    // color : ,
    number : document.querySelector('#itemQuantity').innerText
}
console.log (currentProduct)

// Créer un array panier
let cart = []
cart.push('f', 'd') // test
console.table(cart) // monitor
console.log(JSON.stringify(cart[1])) // monitor

// Fonction ajouter le produit en cours au panier
function addToCart(currentProduct) {
    cart.push(currentProduct)
}

// Exécuter fonction si click button
document.getElementById('addToCart').addEventListener('click', addToCart(currentProduct))



// Il faut récupérer les infos actuellement affichées et les transmettre à la variable produit avant de push le produit dans le tableau

// Lorsqu’on ajoute un produit au panier, si celui-ci n'était pas déjà présent dans le panier, on ajoute un nouvel élément dans l’array

// Lorsqu’on ajoute un produit au panier, si celui-ci était déjà présent dans le panier (même id + même couleur), on incrémente simplement la quantité du produit correspondant dans l’array

// Si le nombre de produit ajouté est zéro ou si la couleur n'est pas définie, messages d'erreurs


// Envoyer le JSON dans le local storage

// END