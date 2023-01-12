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
  /^[a-zA-ZÀ-ÿ]([ -]?[a-zA-ZÀ-ÿ]){1,49}$/
);
// Instance lastName
let lastName = new FormField(
  document.getElementById('lastName'),
  document.getElementById('lastNameErrorMsg'),
  'Le Nom actuel n\'est pas un Nom valide. Veuillez poursuivre ou corriger votre saisie',
  /^[a-zA-ZÀ-ÿ]([' -]?[a-zA-ZÀ-ÿ]){1,49}$/
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
  /^[a-zA-Z]([' -]?[a-zA-Z]){1,59}$/
);
// Instance email
let email = new FormField(
  document.getElementById('email'),
  document.getElementById('emailErrorMsg'),
  'Adresse mail invalide. Veuillez corriger ou terminer la saisie.',
  /^\w+@[a-zA-Z]+?\.[a-zA-Z]{2,3}$/
);


//  Objet contact pour requête POST
let contact = {
  firstName: document.getElementById('firstName').value,
  lastName: document.getElementById('lastName').value,
  address: document.getElementById('address').value,
  city: document.getElementById('city').value,
  email: document.getElementById('email').value
};

// Array products pour requête POST
let products = [];

// Evènements du bouton submit 'Commander !'
const submitBtn = document.getElementById('order');
submitBtn.addEventListener('click', function(e) {
  e.preventDefault();
  order();
});

// Fonction actualisant l'objet 'contact'
function updateContact() {
  contact.firstName = document.getElementById('firstName').value;
    contact.lastName = document.getElementById('lastName').value;
    contact.address = document.getElementById('address').value;
    contact.city = document.getElementById('city').value;
    contact.email = document.getElementById('email').value;
    saveContact();
}

// Fonctions de stockage de l'objet 'contact' dans le LS
function saveContact() {
  localStorage.setItem('contact', JSON.stringify(contact));
}

// Fonction de surveillance de la validité des champs du formulaire 
function checkField(formField) {
  formField.field.addEventListener('input', testField);
  function testField() {
    let result = formField.pattern.test(formField.field.value);
    if(result == true) {
      formField.msgField.textContent = '';
      updateContact();
      } else if(formField.field.value == '') {
        formField.msgField.textContent = 'Veuillez renseigner ce champ';
      } else {
      formField.msgField.textContent = formField.msgTxt;
    }
  }
};

// Exécution de la fonction de surveillance pour chacun des champs du formulaire
checkField(firstName);
checkField(lastName);
checkField(address);
checkField(city);
checkField(email);


// Fonction permettent d'actualiser le tableau products
function updateProducts() {
  products = [];
  let cart = getCart();
  for (let item of cart) {
    products.push(item.id);
  }
  localStorage.setItem('products', JSON.stringify(products))
};
updateProducts();

// Fonction affichant un message de contrainte tant le champ est vides
toFillFields();
function toFillFields() {
  let fields = document.querySelectorAll('.cart__order__form__question');
  for(let field of fields) {
    if(field.input == undefined) {
      field.querySelector('p').textContent = "Veuillez renseigner ce champ"
    }
  }
};

// Fonction requête POST
async function sendData(data) {
  await fetch(`http://localhost:300/api/products/order`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(jsObj => window.location.href='../html/confirmation.html' + '?id=' + jsObj.orderId)
  .catch(error => alert(error))
};

// Fonction conditionnant l'envoi de la requête POST
async function order() {
  updateContact();
  updateProducts();
  let data = {
    'contact': contact,
    'products': products
  };

  // Vérification des conditions avant requête
  if(
    products &&
    products.length >= 1 &&

    contact &&
    contact.firstName &&
    contact.lastName &&
    contact.address &&
    contact.city &&
    contact.email &&

    data.contact.firstName != "" &&
    firstName.pattern.test(data.contact.firstName) == true &&

    data.contact.lastName != "" &&
    lastName.pattern.test(data.contact.lastName) == true &&

    data.contact.address != "" &&
    address.pattern.test(data.contact.address) == true &&

    data.contact.city != "" &&
    city.pattern.test(data.contact.city) == true &&

    data.contact.email != "" &&
    email.pattern.test(data.contact.email) == true
    ) {
    sendData(data);
  }
}