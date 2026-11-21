
document.addEventListener("DOMContentLoaded", function () {

    const products = {

        arc: {
            name: "ARC SUNGLASSES",
            price: "₹1,899",
            category: "EYEWEAR",
            image: "assets/images/sunglasses.jpg",
            reference: "REF. 001 / COLLECTION 001",
            description: "A considered silhouette designed for everyday wear. Minimal in form, distinctive in presence."
        },

        form: {
            name: "FORM SHOULDER BAG",
            price: "₹3,499",
            category: "BAGS",
            image: "assets/images/shoulder-bag.png",
            reference: "REF. 002 / COLLECTION 001",
            description: "An understated everyday essential. Designed with purpose, defined by simplicity."
        },

        mono: {
            name: "MONO CARDHOLDER",
            price: "₹999",
            category: "OBJECTS",
            image: "assets/images/cardholder.png",
            reference: "REF. 003 / COLLECTION 001",
            description: "A compact everyday object. Functional design meets a refined silhouette."
        },

        frame: {
            name: "FRAME SUNGLASSES",
            price: "PRICE TBD",
            category: "EYEWEAR",
            image: "assets/images/frame.png",
            reference: "REF. 004 / COLLECTION 001",
            description: "A distinctive frame designed to make an understated statement."
        },

        offset: {
            name: "OFFSET SHADES",
            price: "PRICE TBD",
            category: "EYEWEAR",
            image: "assets/images/offset.png",
            reference: "REF. 005 / COLLECTION 001",
            description: "Contemporary eyewear with a considered, unconventional silhouette."
        },

        carry: {
            name: "CARRY TOTE",
            price: "PRICE TBD",
            category: "BAGS",
            image: "assets/images/carry.png",
            reference: "REF. 006 / COLLECTION 001",
            description: "A practical everyday companion. Designed to carry what matters."
        },

        sling: {
            name: "SLING CROSSBODY",
            price: "PRICE TBD",
            category: "BAGS",
            image: "assets/images/sling.png",
            reference: "REF. 007 / COLLECTION 001",
            description: "A versatile carry essential with a clean, functional form."
        },

        edge: {
            name: "EDGE WALLET",
            price: "PRICE TBD",
            category: "OBJECTS",
            image: "assets/images/edge.png",
            reference: "REF. 008 / COLLECTION 001",
            description: "A minimal everyday accessory where function meets form."
        },

        object: {
            name: "OBJECT WATCH",
            price: "PRICE TBD",
            category: "OBJECTS",
            image: "assets/images/object.png",
            reference: "REF. 009 / COLLECTION 001",
            description: "A considered timepiece designed around simplicity and detail."
        }

    };

    const params = new URLSearchParams(window.location.search);
    const selectedItem = params.get("item");

    const product = products[selectedItem] || products.arc;

    document.getElementById("product-name").textContent = product.name;
    document.getElementById("product-price").textContent = product.price;
    document.getElementById("product-category").textContent =
        "OTHERFORM — " + product.category;
    document.getElementById("product-image").src = product.image;
    document.getElementById("product-image").alt = product.name;
    document.getElementById("product-reference").textContent = product.reference;
    document.getElementById("product-description").textContent = product.description;

    document.title = product.name + " — OTHERFORM";

    const addButton = document.getElementById("add-to-cart");

    if (!addButton) return;

    addButton.addEventListener("click", function () {

        const selectedItem = params.get("item") || "arc";

        let cart = JSON.parse(
            localStorage.getItem("otherform-cart") || "[]"
        );

        const existingProduct = cart.find(
            item => item.id === selectedItem
        );

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({
                id: selectedItem,
                quantity: 1
            });
        }

        localStorage.setItem("otherform-cart", JSON.stringify(cart));

        addButton.textContent = "ADDED TO CART ✓";

        setTimeout(function () {
            addButton.textContent = "ADD TO CART";
        }, 1500);

    });

});
