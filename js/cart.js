
const cartProducts = {
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

function displayCart() {

    let cart = JSON.parse(localStorage.getItem("otherform-cart")) || [];

    const container = document.getElementById("cart-items");
    const emptyMessage = document.getElementById("empty-cart");

    container.innerHTML = "";

    let total = 0;
    let itemCount = 0;

    cart.forEach((item, index) => {

        const product = cartProducts[item.id];

        if (!product) return;

        const itemTotal = product.price * item.quantity;

        total += itemTotal;
        itemCount += item.quantity;

        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";

        cartItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}">

            <div class="cart-item-info">
                <h3>${product.name}</h3>
                <p>₹${product.price.toLocaleString("en-IN")}</p>

                <div class="quantity-controls">
                    <button onclick="changeQuantity('${item.id}', -1)">−</button>
                    <span>${item.quantity}</span>
                    <button onclick="changeQuantity('${item.id}', 1)">+</button>
                </div>

                <button class="remove-item"
                    onclick="removeItem('${item.id}')">
                    REMOVE
                </button>
            </div>

            <p class="cart-item-total">
                ₹${itemTotal.toLocaleString("en-IN")}
            </p>
        `;

        container.appendChild(cartItem);

    });

    document.getElementById("cart-subtotal").textContent =
        "₹" + total.toLocaleString("en-IN");

    document.getElementById("cart-total").textContent =
        "₹" + total.toLocaleString("en-IN");

    document.getElementById("cart-item-count").textContent =
        itemCount + (itemCount === 1 ? " ITEM" : " ITEMS");

    document.getElementById("nav-cart-count").textContent = itemCount;

    emptyMessage.style.display = itemCount === 0 ? "block" : "none";

    document.getElementById("checkout-button").style.display =
        itemCount === 0 ? "none" : "block";
}

function changeQuantity(id, change) {

    let cart = JSON.parse(localStorage.getItem("otherform-cart")) || [];

    const item = cart.find(product => product.id === id);

    if (item) {
        item.quantity += change;
    }

    cart = cart.filter(product => product.quantity > 0);

    localStorage.setItem("otherform-cart", JSON.stringify(cart));

    displayCart();
}

function removeItem(id) {

    let cart = JSON.parse(localStorage.getItem("otherform-cart")) || [];

    cart = cart.filter(item => item.id !== id);

    localStorage.setItem("otherform-cart", JSON.stringify(cart));

    displayCart();
}

displayCart();
