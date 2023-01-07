// Définition des entrées utilisateur
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const address = document.getElementById('address');
const city = document.getElementById('city');
const email = document.getElementById('email');

// Définition des champs d'affichage d'erreur
const firstNameErrorMsg = document.getElementById('firstNameErrorMsg');
const lastNameErrorMsg = document.getElementById('lastNameErrorMsg');
const addressErrorMsg = document.getElementById('addressErrorMsg');
const cityErrorMsg = document.getElementById('cityErrorMsg');
const emailErrorMsg = document.getElementById('emailErrorMsg');

// Définition des messages d'erreur
const firstNameErrorMsgTxt = 'Le prénom actuel n\'est pas un prénom valide. Veuillez poursuivre ou corriger votre saisie';
const lastNameErrMsg = 'Le Nom actuel n\'est pas un Nom valide. Veuillez poursuivre ou corriger votre saisie';
const addressErrorMsgTxt = 'L\'adresse actuelle n\'est pas une adresse valide. Veuillez poursuivre ou corriger votre saisie';
const cityErrorMsgTxt = 'La ville actuellement saisie n\'existe pas. Veuillez terminer ou corriger votre saisie';
const emailErrorMsgTxt = 'Adresse mail invalide. Veuillez corriger ou terminer la saisie.';

// Définition des regex
const nameRegex = /^[a-zA-ZÀ-ÿ]([ -]?[a-zA-ZÀ-ÿ]){0,49}$/;
const addressRegex = /^[a-zA-Z]([' -]?[a-zA-Z]){0,59}$/;
const cityRegex = /^[a-zA-Z]([' -]?[a-zA-Z]){0,59}$/;
const emailRegex = /^\w+@[a-zA-Z]+?\.[a-zA-Z]{2,3}$/;


// Surveillance des saisies utilisateurs
firstName.addEventListener('input',() => () => checkField(firstName));
lastName.addEventListener('input', () => checkField(lastName));
address.addEventListener('input', () => checkField(address));
city.addEventListener('input', () => checkField(city));
email.addEventListener('input', () => checkField(email,emailErrorMsg, emailErrorMsgTxt, emailRegex));

// Fonction surveillance retournant un message d'erreur
function checkField(inputField, errField, errMsg, regex) {
    let result = regex.test(inputField.value);
    if(result == true || inputField.value == '') {
        errField.textContent = '';
    } else {
        errField.textContent = errMsg;
    }
};