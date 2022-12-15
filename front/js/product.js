// Récupérer l'id du produit dans l'url
let productId = new URL(document.location.href).searchParams.get('id')

// Requête produit
fetch(`http://localhost:3000/api/products/${productId}`)
    .then((res) => res.json())
    .then((product) => displayProduct(product))
    .catch((error) => {
        document.getElementById('title').textContent = 'Impossible d\'afficher le produit demandé'
    })

//  On définit la fonction a exécuter comprenant les autres fonctions-étapes
function displayProduct(product) {
    displayPageTitle(product)
    displaySpecs(product)
    displayColors(product)
}

//  Display page title (product name)
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

// Déclarer une variable en relation avec ce que la page produit affiche (id du produit, couleur et nombre)

// Ecouter les changements sur la page (couleur, nombre) et modifier la variable à chaque fois

// Ecouter submit

// Définir un local storage ? Y envoyer le nombre et la couleur choisis. Le nombre est égal au nombre de fois ou un produit strictement similaire existe (couleur incluse)
// Une couleur différente indique que le produit est un autre produit même si l'id est le même.
// On peut aussi envisager une autre méthode et afficher d'abord le produit puis le nombre en fonction du coloris (à voir en fonction de l'exercice)

//  Transmettre les données du local storage à la page panier (?)

// END

