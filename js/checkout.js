
const checkoutProducts = {
    arc: {
        name: "ARC SUNGLASSES",
        price: 1899,
        image: "assets/images/sunglasses.jpg"
    },
    form: {
        name: "FORM SHOULDER BAG",
        price: 3499,
        image: "assets/images/shoulder-bag.png"
    },
    mono: {
        name: "MONO CARDHOLDER",
        price: 999,
        image: "assets/images/cardholder.png"
    },
    frame: {
        name: "FRAME SUNGLASSES",
        price: 2299,
        image: "assets/images/frame.png"
    },
    offset: {
        name: "OFFSET SHADES",
        price: 2499,
        image: "assets/images/offset.png"
    },
    carry: {
        name: "CARRY TOTE",
        price: 2499,
        image: "assets/images/carry.png"
    },
    sling: {
        name: "SLING CROSSBODY",
        price: 3299,
        image: "assets/images/sling.png"
    },
    edge: {
        name: "EDGE WALLET",
        price: 1299,
        image: "assets/images/edge.png"
    },
    object: {
        name: "OBJECT WATCH",
        price: 4999,
        image: "assets/images/object.png"
    }
};

let cart = JSON.parse(
    localStorage.getItem("otherform-cart") || "[]"
);

const checkoutItems = document.getElementById("checkout-items");
const checkoutEmpty = document.getElementById("checkout-empty");
const checkoutLayout = document.querySelector(".checkout-layout");

let subtotal = 0;

function updateCartCount() {
    let totalItems = cart.reduce(function(total, item) {
        return total + item.quantity;
    }, 0);

    const cartLink = document.querySelector(
        'a[href="cart.html"]'
    );

    if (cartLink) {
        cartLink.textContent = "CART (" + totalItems + ")";
    }
}

function displayCheckout() {
    checkoutItems.innerHTML = "";
    subtotal = 0;

    if (cart.length === 0) {
        checkoutLayout.style.display = "none";
        checkoutEmpty.style.display = "block";
        return;
    }

    checkoutLayout.style.display = "grid";
    checkoutEmpty.style.display = "none";

    cart.forEach(function(item) {
        const product = checkoutProducts[item.id];

        if (!product) return;

        const itemTotal = product.price * item.quantity;
        subtotal += itemTotal;

        const itemElement = document.createElement("div");
        itemElement.className = "checkout-item";

        itemElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">

            <div class="checkout-item-info">
                <h3>${product.name}</h3>
                <p>QUANTITY: ${item.quantity}</p>
            </div>

            <span>₹${itemTotal.toLocaleString("en-IN")}</span>
        `;

        checkoutItems.appendChild(itemElement);
    });

    document.getElementById("checkout-subtotal").textContent =
        "₹" + subtotal.toLocaleString("en-IN");

    document.getElementById("checkout-total").textContent =
        "₹" + subtotal.toLocaleString("en-IN");
}

document.getElementById("checkout-form").addEventListener(
    "submit", function(event) {
        event.preventDefault();

        if (cart.length === 0) return;

        const customerName =
            document.getElementById("full-name").value;

        const orderNumber =
            "OF-" + Date.now().toString().slice(-8);

        document.getElementById("order-customer").textContent =
            "ORDER FOR: " + customerName;

        document.getElementById("order-number").textContent =
            "ORDER REFERENCE: " + orderNumber;

        checkoutLayout.style.display = "none";

        document.getElementById("order-confirmation").style.display =
            "block";

        localStorage.removeItem("otherform-cart");

        cart = [];

        updateCartCount();
    }
);

displayCheckout();
updateCartCount();
