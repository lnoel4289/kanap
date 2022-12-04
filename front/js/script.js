/** Copier le noeud 'section.items a'
*/
// let container = document.getDocumentById('items')
// let item = document.querySelector('section.items > a');
// let nextItem = item.cloneNode();
// container.append(nextItem);


/** Requéter l'API
*/
fetch('http://localhost:3000/api/products') // requête GET HTTP
    .then(function(res) { // 
        if (res.ok) { // si la requête s'est bien passée
            return res.json(); // promesse
        }
    })
    .then(function(value) {
        console.log(value); // monitoring
    })
    .catch(function(err) {
        console.log('error'); // monitoring en cas d'erreur (requête échouée)
    });

/**
 * Affichage produits
 */
let items = document.getElementsByClassName('items');

items[0].querySelector("img").src = "http://localhost:3000/kanap01.jpeg";
items[0].querySelector("img").alt = "bonjour";
items[0].querySelector('a > article > h3')
    .textContent = 'bonjour';
items[0].querySelector('a > article > p')
    .textContent = 'bonjour';

let item = items[0].cloneNode;
item.append;

