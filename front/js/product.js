// Récupérer l'id du produit dans l'url
let urlString = document.location.href;
let currentUrl = new URL(urlString);
let idNumber = currentUrl.searchParams.get('id');


// Récupérer le tableau 'products' avec l'API Fetch
fetch('http://localhost:3000/api/products/')
    .then((res) => res.json())
    .then((products) => displayProduct(products))
    .catch((error) => {
        document.getElementsByTagName('h1').textContent = error
    });


//  On définit la fonction a exécuter qui comprendre les autres fonctions
function displayProduct(products) {
    let product = fetchProduct(products);
    displaySpecs(product);
};

// Comparer l'id récupérée dans l'Url avec l'id présente dans les propriétés de 'products' de l'API et retourner la valeur
function fetchProduct(products){
    for (let product of products) {
        if (product._id == idNumber) {
            return product;
        };
    };
};

// Afficher les propriétés nécessaires du 'product' sur la page product.html
function displaySpecs(product) {
    console.log(product); // monitor
    
};

// Ecouter les changements sur nombre et couleur (le choix de couleur nécessitera une boucle ?for of? car le nombre de couleurs disponibles dépend de l'objet)

// Définir un local storage ? Y envoyer le nombre et la couleur choisis

//  Transmettre les données du local storage à la page panier (?)

// END