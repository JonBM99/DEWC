import Carrito from "./carrito.js";
let products = []; // Array para almacenar los productos obtenidos de la API
let currency;

document.addEventListener("DOMContentLoaded", () => {
    
    // Usamos fetch para obtener los datos de la API
    fetch("http://localhost:8080/api/carrito")
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log("Datos:", data);
            console.log("Currency:", data.currency);
            console.log("Products:", data.products);
            console.log("Número de productos:", data.products.length);
            
            currency = data.currency; // Asignamos a la variable global
            products = data.products; // Asignamos a la variable global
            
            createTable(); // Creamos la tabla DESPUÉS de obtener los datos
        })
        .catch(error => {
            console.error("Error al obtener los datos:", error);
            console.error("Detalles del error:", error.message);
        });

    const tBody = document.querySelector("#cart-container tbody");
    const totalContainer = document.getElementById("total-container");
    const carrito = new Carrito();

    // Función para calcular el total del carrito
    function calculateTotal() {
        let total = 0;
        // Iteramos sobre los valores del Map (carrito.products es un Map)
        for (let product of carrito.products.values()) {
            total += parseFloat(product.price) * product.quantity;
        }
        return total;
    }

    // Función para actualizar el total
    function updateTotal() {
        totalContainer.innerHTML = ""; // Limpiamos el contenedor del total
        
        const titleH2 = document.createElement("h2");
        titleH2.textContent = "Total";
        totalContainer.appendChild(titleH2);
        
        // Mostrar productos con cantidad > 0
        // carrito.products es un Map, usamos for...of con .values()
        for (let product of carrito.products.values()) {
            if (product.quantity > 0) {
                const productDiv = document.createElement("div");
                productDiv.textContent = `${product.title} x ${product.quantity}`;
                totalContainer.appendChild(productDiv);
            }
        }

        const hr = document.createElement("hr"); // Línea horizontal cuando hay productos
        totalContainer.appendChild(hr);

        // Mostrar el total calculado
        const totalP = document.createElement("p");
        const total = calculateTotal();
        totalP.textContent = `TOTAL: ${total.toFixed(2)} ${currency}`;
        totalContainer.appendChild(totalP);
    }

    // Función para crear la tabla de productos
    function createTable() {
        products.forEach(product => {
            const item = document.createElement("tr");
            const sku = product.sku; // Usamos SKU como clave

            // Celda de titulo y SKU
            const itemTitle = document.createElement("td");
            const pTitle = document.createElement("p");
            pTitle.textContent = `${product.title}`;
            const pSKU = document.createElement("p");
            pSKU.textContent = `Ref: ${product.sku}`;
            itemTitle.append(pTitle, pSKU);
            
            // Celda de cantidad
            const itemQuantity = document.createElement("td");
            const quantityInput = document.createElement("input");
            quantityInput.type = "number";
            quantityInput.readOnly = true;
            quantityInput.value = "0";
            quantityInput.classList.add("input");

            const btnMinus = document.createElement("button");
            btnMinus.textContent = "-";
            btnMinus.classList.add("btn-minus");

            const btnPlus = document.createElement("button");
            btnPlus.textContent = "+";
            btnPlus.classList.add("btn-plus");
            itemQuantity.append(btnMinus, quantityInput, btnPlus);

            // Celda de precio x unidad
            const itemUnit = document.createElement("td");
            const priceUnit = parseFloat(product.price);
            itemUnit.textContent = `${priceUnit.toFixed(2)} ${currency}`;

            // Celda de precio total
            const itemTotal = document.createElement("td");
            itemTotal.textContent = `0.00 ${currency}`;

            item.append(itemTitle, itemQuantity, itemUnit, itemTotal);
            tBody.appendChild(item);

            // Evento para el boton de restar
            btnMinus.addEventListener("click", () => {
                let quantity = parseInt(quantityInput.value);
                if (quantity > 0) quantity--;
                quantityInput.value = quantity;
                carrito.registerProducto(sku, {
                    sku: sku,
                    title: product.title,
                    price: parseFloat(product.price),
                    quantity: quantity
                });
                // Actualizamos el total de la fila
                const totalRow = parseFloat(product.price) * quantity;
                itemTotal.textContent = `${totalRow.toFixed(2)} ${currency}`;
                updateTotal();
            });

            // Evento para el boton de sumar
            btnPlus.addEventListener("click", () => {
                let quantity = parseInt(quantityInput.value);
                quantity++;
                quantityInput.value = quantity;
                carrito.registerProducto(sku, {
                    sku: sku,
                    title: product.title,
                    price: parseFloat(product.price),
                    quantity: quantity
                });
                // Actualizamos el total de la fila
                const totalRow = parseFloat(product.price) * quantity;
                itemTotal.textContent = `${totalRow.toFixed(2)} ${currency}`;
                updateTotal();
            });
        });
    }
});