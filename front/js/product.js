// Récupérer l'id du produit dans l'url
let idNumber = new URL(document.location.href).searchParams.get('id')

// Récupérer le tableau 'products' avec l'API Fetch
fetch('http://localhost:3000/api/products/')
    .then((res) => res.json())
    .then((products) => displayProduct(products))
    .catch((error) => {
        document.getElementsByTagName('h1').innerText = error
    })

// Comparer l'id récupérée dans l'Url avec l'id présente dans les propriétés de 'products' de l'API et retourner la valeur
function getProduct(products) {
    for (let product of products) {
        if (product._id == idNumber) {
            return product
        }
    }
}

//  On définit la fonction a exécuter qui comprend les autres fonctions-étapes
function displayProduct(products) {
    let product = getProduct(products)
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

// Add colors options in color selector
function displayColors(product) {
    let colors = product.colors
    for (let color of colors) {
        document.getElementById('colors').innerHTML += `<option value="${color}">${color}</option>`
    }
}


// Ecouter les changements sur nombre et couleur (le choix de couleur nécessitera une boucle ?for of? car le nombre de couleurs disponibles dépend de l'objet)

// Définir un local storage ? Y envoyer le nombre et la couleur choisis

//  Transmettre les données du local storage à la page panier (?)

// END

