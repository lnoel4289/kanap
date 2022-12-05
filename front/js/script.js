let item = document.querySelector('section.items > a');

// function addItem() {

/** Requéter l'API
*/
fetch('http://localhost:3000/api/products/') // requête GET HTTP
    .then(function(res) { // 
        if (res.ok) { // si la requête s'est bien passée
            return res.json(); // promesse
        }
    })
    /** Insertion des données de l'objet récupéré (value)
     * 
     */
    .then(function(value) {
        item.querySelector("img").src = value[0].imageUrl;
        item.querySelector("img").alt = value[0].altTxt;
        item.querySelector('a > article > h3')
            .textContent = value[0].name;
        item.querySelector('a > article > p')
            .textContent = value[0].description;
    })
    .catch(function(err) {
        alert('Echec du serveur');
    });
    /** Copier le noeud 'section.items a'
    */
    let item02 = item.cloneNode(true);
    document.getElementById('items').appendChild(item02);

// }