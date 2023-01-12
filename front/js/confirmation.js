// Récupérer l'id de la commande dans l'url
function confirm() {
    if(orderId != undefined) {
        const orderId = new URL(document.location.href).searchParams.get('id');
        document.getElementById('orderId').textContent = orderId;
        localStorage.clear();
    } else {
        document.getElementById('orderId').textContent = 'Echec de la commande. Veullez modifier votre panier.';
    }
};
confirm();




