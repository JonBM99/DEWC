import { Iproduct } from './../../interfaces/iproduct';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule, NgForm} from '@angular/forms';
import { ProductServices } from '../../services/product-services';
import { ProductCard } from "../../components/product-card/product-card";


@Component({
  selector: 'app-product-filter',
  imports: [FormsModule, ProductCard],
  templateUrl: './product-filter.html',
  styleUrl: './product-filter.css',
})
export class ProductFilter {
  productServices = inject(ProductServices);
  categories: string[];
  active: string[];
  name: string[];
  price: number[];
  arrayProducts: Iproduct[];



  @Output() filterSelected: EventEmitter<string> = new EventEmitter;

  constructor(){
    this.categories = [
      'mujer', 'hombre','niño'
    ];
    this.active = [
      'true','false'
    ];
    this.name = [
      'camisa', 'chaqueta', 'camisetas', 'pantalón', 'polo', 'sudadera', 'suéter', 'saco', 'vestido'
    ];
    this.price = [
      10,30,50
    ]
    this.arrayProducts = [];
  }

  getDataFilter(filterForm: NgForm){
    this.filterSelected.emit(filterForm.value.category);
    if(filterForm.value.category != undefined){
      this.arrayProducts = this.productServices.getProductByCategory(filterForm.value.category);
    }
    filterForm.reset();
  }

  getDataFilter2(filterForm2: NgForm){
    this.filterSelected.emit(filterForm2.value.active);
    if(filterForm2.value.active != undefined){
      this.arrayProducts = this.productServices.getProductByActive(filterForm2.value.active);
    }
    filterForm2.reset();
  }

  getDataFilter3(filterForm3: NgForm){
    this.filterSelected.emit(filterForm3.value.name);
    if(filterForm3.value.name != undefined){
      this.arrayProducts = this.productServices.getProductByName(filterForm3.value.name);
    }
    filterForm3.reset();
  }

  getDataFilter4(filterForm4: NgForm){
    this.filterSelected.emit(filterForm4.value.price);
    if(filterForm4.value.price != undefined){
      this.arrayProducts = this.productServices.getProductByPrice(filterForm4.value.price);
    }
    filterForm4.reset();
  }
}
