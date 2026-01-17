import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ProductServices } from '../../services/product-services';
import { IProduct } from '../../interfaces/iproduct';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-product-view',
  imports: [RouterLink],
  templateUrl: './product-view.html',
  styleUrl: './product-view.css',
})
export class ProductView {

  private productServices = inject(ProductServices);
  @Input() product!: IProduct;
  @Output() productDeleted = new EventEmitter<string>();

  async deleteProduct(productId: number): Promise<void> {
    try {
      await this.productServices.deleteProductById(productId);
      this.productDeleted.emit(productId.toString());
      console.log('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  }
}
