//  Requêter l'API
fetch('http://localhost:3000/api/products/')
    .then((res) => res.json())
    .then((products) => {
    myKanaps(products);
    })
    .catch((error) => {
        document.querySelector('.titles').innerHTML = '<h1>Serveur indisponible</h1>'
    });

// Fonction/boucle remplissant le noeud 'item' puis le clonant
function myKanaps(products) {
    for (product of products) {

        // Remplir chaque item avec les propriétés de chaque propriété de l'array products
        let item = document.querySelector('#items > a');
        item.querySelector('img').src = product.imageUrl;
        item.querySelector('img').alt = product.altTxt;
        item.querySelector('.productName').textContent = product.name;
        item.querySelector('.productDescription').textContent = product.description;

        // Boucle interrompue si le nombre d'enfants de 'items' est égal au nombre de 'product' du tableau 'products'
        if (items.childElementCount == products.length) {
        break;
    }
        // Suite de la boucle si celle-ci n'a pas été interrompue - Copie du noeud 'item'
        document.getElementById('items').appendChild(item.cloneNode(true));
    }
}