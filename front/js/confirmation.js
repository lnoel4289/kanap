// Récupérer l'id de la commande dans l'url
function confirm() {
    const orderId = new URL(document.location.href).searchParams.get('id');
    document.getElementById('orderId').textContent = orderId;
    localStorage.clear();
};
confirm();