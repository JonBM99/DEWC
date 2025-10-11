// class Producto{
//     constructor(
//         SKU, title, price){
//         this.SKU = SKU;
//         this.title = title;
//         this.price = parseFloat(price);
//     }
// }

// class Carrito {
//     constructor(currency){
//         this.currency = currency;
//         this.products = [];
//     }
//     añadirProducto(nuevoProducto) {
//         this.products.push(nuevoProducto);
//     }
// }
// export {Carrito, Producto};
export default class Carrito { //Clase Carrito
    constructor(){  //Constructor
        this.products = new Map();  //Mapa para almacenar los productos
    }
    registerProducto(sku, producto){  //Metodo para registrar un producto
        if(producto.quantity == 0){
            this.products.delete(sku); //Si la cantidad es 0, eliminamos el producto del carrito
        } else {
            this.products.set(sku, producto);  //Si no, añadimos o actualizamos el producto en el carrito
        }
    }
}