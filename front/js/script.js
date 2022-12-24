//  Requêter l'API
fetch('http://localhost:3000/api/products/')
    .then(res => res.json())
    .then(products => displayProducts(products))
    .catch(() => document.querySelector('h1').textContent = 'Serveur indisponible'
    );

// Afficher les produits
function displayProducts(products) {
    for (let product of products) {
        document.getElementById('items').innerHTML += `<a href="./product.html?id=${product._id}">
        <article>
          <img src="${product.imageUrl}" alt="${product.altTxt}">
          <h3 class="productName">${product.name}</h3>
          <p class="productDescription">${product.description}</p>
        </article>`;
    }
}