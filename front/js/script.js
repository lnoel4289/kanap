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

// chris
// fetch('http://localhost:3000/api/products/')
//     .then((res) => res.json())
//     .then((myProducts) => {
//     myKanaps(myProducts);
//     })
//     .catch((error) => {
//         document.querySelector('.titles').innerHTML = '<h1>Server indisponible</h1>'
//     });

//     function myKanaps(index) {
//         let articlesZone = document.querySelector('#items');

//         for (let article of index) {

//             articlesZone.innerHTML += `
//             <a href="./product.html?id=42">
//             <article>
//               <img src=".../product01.jpg" alt="Lorem ipsum dolor sit amet, Kanap name1">
//               <h3 class="productName">Kanap name1</h3>
//               <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
//             </article>
//           </a>`
//         }
//     }