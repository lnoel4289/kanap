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



/** Copier le noeud 'section.items a'
*/
let item01 = document.querySelector('section.items > a')
let item02 = item01.cloneNode(true);
document.getElementById('items').appendChild(item02);




/**
 * Affichage produits
 */
let item = document.querySelector('section.items > a');

item.querySelector("img").src = "http://localhost:3000/kanap01.jpeg";
item.querySelector("img").alt = "bonjour";
item.querySelector('a > article > h3')
    .textContent = 'bonjour';
item.querySelector('a > article > p')
    .textContent = 'bonjour';



