// Récupérer l'id de la commande dans l'url
const orderId = new URL(document.location.href).searchParams.get('id');

document.getElementById('orderId').textContent = orderId;

if(orderId) {
    localStorage.clear();
};