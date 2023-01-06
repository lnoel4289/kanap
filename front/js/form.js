// FORMULAIRE --------------------------

//  Objet contact pour requête POST
let contact = {
    firstName: document.getElementById('firstName').value,
    lastName: document.getElementById('lastName').value,
    address: document.getElementById('address').value,
    city: document.getElementById('city').value,
    email: document.getElementById('email').value
  }
  
  // Tableau products pour requête POST
  let products = [];
  
  // Submit
  const submitBtn = document.getElementById('order')
  
  submitBtn.addEventListener('click', order)
  
  // Fonction requête POST
  async function order(btn) {
    btn.preventDefault();
    let data = {
      'contact': contact,
      'products': products
    };
    // !!! C'est ici qu'on devrait vérifier if/else !!!
    await fetch(`http://localhost:3000/api/products/order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then((res) => res.json())
    .then((jsObj) => jsObj.orderId)
    .then(bnl => window.location.href='../html/confirmation.html' + '?id=' + bnl)
  };
  // !!! Le clic sur submit doit donner lieu à une vérification du contenu de 'data' (récupéré dans le LS) avant le POST !!!
  
  
  // Fonction récupérant l'orderId et envoi vers la page confirmation
  function catchOrderId(response) {
    let orderId = response.orderId;
  
  }
  
  // Fonction permettent d'actualiser le tableau products
  function setProducts() {
    let cart = getCart();
    for (let item of cart) {
      products.push(item.id);
    }
    localStorage.setItem('products', JSON.stringify(products))
  };setProducts()
  
  
  
  
  // Classe champ du formulaire
  class FormField {
    constructor(field, msgField ,msgTxt ,pattern) {
      this.field = field;
      this.msgField = msgField;
      this.msgTxt = msgTxt;
      this.pattern = pattern;
    }
  }
  // Instance firstName
  let firstName = new FormField(
    document.getElementById('firstName'),
    document.getElementById('firstNameErrorMsg'),
    'Le prénom actuel n\'est pas un prénom valide. Veuillez poursuivre ou corriger votre saisie',
    /^[a-zA-ZÀ-ÿ]([ -]?[a-zA-ZÀ-ÿ]){0,49}$/
  );
  // Instance lastName
  let lastName = new FormField(
    document.getElementById('lastName'),
    document.getElementById('lastNameErrorMsg'),
    'Le Nom actuel n\'est pas un Nom valide. Veuillez poursuivre ou corriger votre saisie',
    /^[a-zA-ZÀ-ÿ]([' -]?[a-zA-ZÀ-ÿ]){0,49}$/
  );
  // Instance address
  let address = new FormField(
    document.getElementById('address'),
    document.getElementById('addressErrorMsg'),
    'L\'adresse actuelle n\'est pas une adresse valide. Veuillez poursuivre ou corriger votre saisie',
    /^[\w\d\s.,#-]*[a-zA-Z]$/
  );
  // Instance city
  let city = new FormField(
    document.getElementById('city'),
    document.getElementById('cityErrorMsg'),
    'La ville actuellement saisie n\'existe pas. Veuillez poursuivre ou corriger votre saisie',
    /^[a-zA-Z]([' -]?[a-zA-Z]){0,59}$/
  );
  // Instance email
  let email = new FormField(
    document.getElementById('email'),
    document.getElementById('emailErrorMsg'),
    'Adresse mail invalide. Veuillez corriger ou terminer la saisie.',
    /^\w+@[a-zA-Z]+?\.[a-zA-Z]{2,3}$/
  );
  
  // Fonction renvoyant un message d'erreur en cas de non-conformité de champs du formulaire
  function validateField(formField) {
    function testField() {
      let result = formField.pattern.test(formField.field.value);
      if(result == true || formField.field.value == '') {
        formField.msgField.textContent = '';
        updateContact();
        } else {
        formField.msgField.textContent = formField.msgTxt;
      }
    }
    formField.field.addEventListener('input', testField);
  };
  
  // Fonction actualisant l'objet 'contact'
  function updateContact() {
    contact.firstName = document.getElementById('firstName').value;
      contact.lastName = document.getElementById('lastName').value;
      contact.address = document.getElementById('address').value;
      contact.city = document.getElementById('city').value;
      contact.email = document.getElementById('email').value;
      lsStoreContact();
  }
  
  // Fonctions de stockage de l'objet 'contact' dans le LS
  function lsStoreContact() {
    localStorage.setItem('contact', JSON.stringify(contact));
  }
  // Fonctions de stockage de l'array 'products' dans le LS
  function lsStoreProducts() {
    localStorage.setItem('products', JSON.stringify(products));
  }
  
  // Exécution des fonctions de surveillance des champs du formulaire
  validateField(firstName);
  validateField(lastName);
  validateField(address);
  validateField(city);
  validateField(email);
  // !!! boucle for of ou foreach ici !!!