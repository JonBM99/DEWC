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
  filteredProducts: Iproduct[]; //creo array donde guardar los productos filtrados

  constructor(){
    this.productsArray = [];
    this.filterCategory = '';
    this.filteredProducts = [];
  }
  ngOnInit(): void{
    this.productsArray = this.productsservice.getAllproducts();
  }

  productsFiltered():Iproduct[]{
    if(!this.filterCategory){ //si no hay filtro seleccionado devuelve todos
      return this.filteredProducts = this.productsArray;
    } else {
    return this.filteredProducts = this.productsArray.filter(p => p.category === this.filterCategory); // si hay filtro devuelve solo los de la categoria filtrada
    }
  }
}
