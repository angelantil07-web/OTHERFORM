
function updateCartCount() {
    let cart = JSON.parse(
        localStorage.getItem("otherform-cart") || "[]"
    );

    let totalItems = cart.reduce(function(total, item) {
        return total + item.quantity;
    }, 0);

    let cartLink = document.querySelector('a[href="cart.html"]');

    if (cartLink) {
        cartLink.textContent = "CART (" + totalItems + ")";
    }
}

updateCartCount();
