import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/interfaces/product.interface';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent {

  @Input() product!: Product;
  @Output() addProduct = new EventEmitter<Product>();
  @Output() detailProduct = new EventEmitter<number>();

  Agregar() {
    this.addProduct.emit(this.product);
  }

  detailsProduct() {
    this.detailProduct.emit(this.product.id);
  }
}
