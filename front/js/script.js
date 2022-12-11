//  Requêter l'API
fetch('http://localhost:3000/api/products/')
    .then((res) => res.json())
    .then((products) => {
    productDisplay(products);
    })
    .catch((error) => {
        document.querySelector('.titles').innerHTML = '<h1>Serveur indisponible</h1>'
    });

// Fonction/boucle remplissant le noeud 'item' puis le clonant
function productDisplay(products) {
    for (product of products) {

        // Remplir chaque item avec les propriétés de chaque propriété de l'array products
        let items = document.getElementById('items');
        let item = items.querySelector('a');
        item.querySelector('img').src = product.imageUrl;
        item.querySelector('img').alt = product.altTxt;
        item.querySelector('.productName').textContent = product.name;
        item.querySelector('.productDescription').textContent = product.description;
        item.href = './product.html?id=' + product._id;

        // Boucle interrompue si le nombre d'enfants de 'items' est égal au nombre de 'product' du tableau 'products'
        if (items.getElementsByTagName('a') < products.length) {
        break; // je ne comprends pas pourquoi 'items' est reconnu alors qu'il n'est pas défini
    }
        // Suite de la boucle si celle-ci n'a pas été interrompue - Copie du noeud 'item'
        items.appendChild(item.cloneNode(true));
    }
}

// Je ne comprends pourquoi le dernier canapé de 'products' apparaît en premier