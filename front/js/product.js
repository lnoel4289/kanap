// Récupérer l'id du produit dans l'url
let urlString = document.location.href
let currentUrl = new URL(urlString)
let idNumber = currentUrl.searchParams.get('id')


// Récupérer le tableau 'products' avec l'API Fetch
fetch('http://localhost:3000/api/products/')
    .then((res) => res.json())
    .then((products) => displayProduct(products))
    .catch((error) => {
        document.getElementsByTagName('h1').textContent = error
    })


//  On définit la fonction a exécuter qui comprend les autres fonctions-étapes
function displayProduct(products) {
    let product = fetchProduct(products)
    displaySpecs(product)
    displayColors(product)
};

// Comparer l'id récupérée dans l'Url avec l'id présente dans les propriétés de 'products' de l'API et retourner la valeur
function fetchProduct(products) {
    for (let product of products) {
        if (product._id == idNumber) {
            return product
        }
    }
}

// Afficher les informations du 'product' sur la page product.html
function displaySpecs(product) {
    document.querySelector('head > title').textContent = product.name

    const item = document.querySelector('.item')
    item.querySelector('img').src = product.imageUrl
    item.querySelector('img').alt = product.altTxt
    document.getElementById('title').textContent = product.name
    document.getElementById('price').textContent = product.price
    document.getElementById('description').textContent = product.description
}

// // Remove default colors
// let options = document.getElementById('colors').children;
// options[1].remove()
// options[1].remove()

// Insert options which number is product.colors.length
function displayColors(product) {
    let colors = product.colors;
    for (color of colors) {
        document.getElementById('colors').appendChild(options[0].cloneNode(true))
    }
}

// Fonction permettant de remplir les options correctement
function fillColorSelectorOptions(options) {

}


// Ecouter les changements sur nombre et couleur (le choix de couleur nécessitera une boucle ?for of? car le nombre de couleurs disponibles dépend de l'objet)

// Définir un local storage ? Y envoyer le nombre et la couleur choisis

//  Transmettre les données du local storage à la page panier (?)

// END

