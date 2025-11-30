
import { Iproduct } from '../../interfaces/iproduct';
import { ProductsService } from '../../services/products-service';
import { ProductCard } from "../../components/product-card/product-card";
import { FormsModule } from '@angular/forms';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-products-list',
  imports: [ProductCard, FormsModule],
  templateUrl: './products-list.html',
  styleUrl: './products-list.css',
})
export class ProductsList {
  productsArray: Iproduct[];
  productsservice = inject(ProductsService);
  filterCategory: string; //creo variable para guardar la categoria para filtrar

  constructor(){
    this.productsArray = [];
    this.filterCategory = ''; //inicializo la categoria
  }
  ngOnInit(): void{
    this.productsArray = this.productsservice.getAllproducts();
  }

  get productsFiltered():Iproduct[]{ //getter que devuelve los productos filtrados segun la categoria
    if(!this.filterCategory){ //si no hay filtro seleccionado devuelve todos
      return this.productsArray;
    }
    return this.productsArray.filter(p => p.category === this.filterCategory); // si hay filtro devuelve solo los de la categoria filtrada
  }

}
