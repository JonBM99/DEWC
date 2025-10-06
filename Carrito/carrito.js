class Producto {
    constructor(SKU, title, price) {
        this.SKU = SKU;
        this.title = title;
        this.price = parseFloat(price);
    }
}
class Carrito {
    constructor(currency) { 
        this.currency = currency;
        this.products = []; 
    }

    addProducto(nuevoProducto) {
        this.products.push(nuevoProducto);
    }
}

export { Carrito, Producto };