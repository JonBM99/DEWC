import { Component, inject } from '@angular/core';
import { IProduct } from '../../interfaces/iproduct';
import { ProductServices } from '../../services/product-services';
import { ProductView } from "../../components/product-view/product-view";

@Component({
  selector: 'app-product-list',
  imports: [ProductView],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {

  productsArray: IProduct[];
  productServices = inject(ProductServices);

  constructor() {
    this.productsArray = [];
  }


  pageActual: number = 1;
  totalPages: number = 1;
  totalProducts: number = 0;
  productsPerPage: number = 10;
  loading: boolean = false;

  async loadProducts(page: number): Promise<void> {
  this.loading = true;

  try {
    const response = await this.productServices.getAllProducts(page);

    this.productsArray = response.products;
    this.pageActual = page;
    this.totalProducts = response.total;
    this.productsPerPage = response.limit;
    this.totalPages = Math.ceil(this.totalProducts / this.productsPerPage);

  } catch (error) {
    console.error('Error loading products:', error);
  } finally {
    this.loading = false;
  }
}

  async ngOnInit(): Promise<void> {
    await this.loadProducts(this.pageActual);
  }

  async onProductDeleted(productId: number): Promise<void> {
    try{
      await this.productServices.deleteProductById(productId);
      this.productsArray = this.productsArray.filter(product => product.id !== productId);
      if(this.productsArray.length === 0 && this.pageActual > 1){
        await this.loadProducts(this.pageActual - 1);
      }
      if(this.productsArray.length === 0 && this.pageActual === 1){
        await this.loadProducts(this.pageActual);
      }
      console.log('Product deleted successfully');
    }catch(error){
      console.error('Error deleting product:', error);
    }
  }

  //Métodos de navegación de páginas
  goToPage(page: number): void { // Ir a una página específica
    if (page >= 1 && page <= this.totalPages) { // Verificamos que la página esté dentro de los límites
      this.loadProducts(page);
    }
  }

  goOneBack(): void{ // Ir una página atrás
    if(this.pageActual > 1){
      this.loadProducts(this.pageActual - 1);
    }
  }

  goOneForward(): void{ // Ir una página adelante
    if(this.pageActual < this.totalPages){
      this.loadProducts(this.pageActual + 1);
    }
  }
}
