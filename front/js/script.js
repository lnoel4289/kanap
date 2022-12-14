//  Requêter l'API
fetch('http://localhost:3000/api/products/')
    .then((res) => res.json())
    .then((products) => {
    displayProducts(products)
    })
    .catch((error) => {
        document.querySelector('h1').textContent = 'Serveur indisponible'
    })

// injecter innerHTML avec backticks et les infos récupérées
function displayProducts(products) {
    for (let product of products) {
        document.getElementById('items').innerHTML += `<a href="./product.html?id=${product._id}">
        <article>
          <img src="${product.imageUrl}" alt="${product.altTxt}">
          <h3 class="productName">${product.name}</h3>
          <p class="productDescription">${product.description}</p>
        </article>`
    }
}

// Note:Pas super en terme de performances à l'affichage