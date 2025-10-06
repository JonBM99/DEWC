import {data} from "./articulos.js";
import {Carrito, Producto} from "./carrito.js"; //Import de la clase Carrito y Producto creada anteriormente

const carrito = new Carrito(data.currency);

document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.querySelector("#cart-container tbody");

  //Insertamos productos en la fila con un for each
  data.products.forEach((p) => {
  const producto = new Producto(p.SKU, p.title, p.price);
  
  //Insertamos la fila
  const item = document.createElement("tr");
  
  //Insertamos la celda de nombre
  const itemTitle = document.createElement("td");
  itemTitle.textContent = producto.title;
  const br = document.createElement("br");
  const itemSKU = document.createElement("p");
  itemSKU.textContent = "Ref: " + producto.SKU;
  itemTitle.append(br, itemSKU)

  //Insertamos la celda de cantidad
  const itemQuantity = document.createElement("td");
  
  //Creamos el boton restar
  const btnMinus = document.createElement("button");
  btnMinus.textContent = "-";
  btnMinus.classList.add("btnMinus"); //Falta crear estilo en css y darselo
  itemQuantity.appendChild(btnMinus); 

  //Creamos el input que mostrara la cantidad
  const quantity = document.createElement("input");
  quantity.type = "number";
  quantity.readOnly = true;
  //quantity.disabled = true; //Si pongo esto hace que no se pueda clickar pero le pone como un blur
  quantity.value = 0;
  quantity.classList.add("quantity"); //Falta crear estilo en css y darselo
  itemQuantity.appendChild(quantity);
  

  //Creamos el boton sumar
  const btnPlus = document.createElement("button");
  btnPlus.textContent = "+";
  btnPlus.classList.add("btnPlus"); //Falta crear estilo en css y darselo
  itemQuantity.appendChild(btnPlus);

  //Insertamos la celda de unidad
  const itemUnit = document.createElement("td");
  itemUnit.textContent = `${producto.price} ${data.currency}`;

  //Insertamos la celda de total
  const itemTotal = document.createElement("td");
  itemTotal.textContent = (`${producto.price}`* quantity.value) + `${data.currency}`;
  
  //Insertamos las celdas en la fila
  item.append(itemTitle, itemQuantity, itemUnit, itemTotal);
  

  //Insertamos la fila en la tabla
  tbody.appendChild(item);
  
  btnMinus.addEventListener('click', () => { // Añado evento para limitar el minimo de items a 0 y restar si es mayor que 0
    if(quantity.value == 0){
      btnMinus.disabled = true;
    } else {
      quantity.value--;
    }
  });

  btnPlus.addEventListener('click', () =>{  // Añado evento para sumar cantidad y desbloquear el btnMinus
    quantity.value++;
    btnMinus.disabled = false;
  });

  });
});


