let items = document.getElementById('items');
let item = items.querySelector('a');

//  Requêter l'API
fetch('http://localhost:3000/api/products/')
    .then((res) => res.json())
    .then((products) => {
    displayProducts(products);
    })
    .catch((error) => {
        document.querySelector('h1').textContent = 'Serveur indisponible'
    });

// Fonction/boucle remplissant le noeud 'item' puis le clonant
function displayProducts(products) {
    for (product of products) {
        // Remplir chaque item avec les propriétés de chaque propriété de l'array products
        item.querySelector('img').src = product.imageUrl;
        item.querySelector('img').alt = product.altTxt;
        item.querySelector('.productName').textContent = product.name;
        item.querySelector('.productDescription').textContent = product.description;
        item.href = './product.html?id=' + product._id; console.log('a');

        // Boucle interrompue si le nombre d'enfants de 'items' est égal au nombre de 'product' du tableau 'products'
        if (items.childElementCount == products.length) {
        break;
    }
    //     // Suite de la boucle si celle-ci n'a pas été interrompue - Copie du noeud 'item'
        items.appendChild(item.cloneNode(true));
    }
}

// Je ne comprends pourquoi le dernier canapé de 'products' apparaît en premier


// function fillItems(products) {
//     for (product of products) {
//         // Remplir chaque item avec les propriétés de chaque propriété de l'array products
//         item.querySelector('img').src = product.imageUrl;
//         item.querySelector('img').alt = product.altTxt;
//         item.querySelector('.productName').textContent = product.name;
//         item.querySelector('.productDescription').textContent = product.description;
//         item.href = './product.html?id=' + product._id;
//     }
// }

// function addItem(products) {
//     for (product of products) {
//         items.appendChild(item.cloneNode(true));
//         if (items.childElementCount == products.length) {
//             break;
//         }
//     }
// }