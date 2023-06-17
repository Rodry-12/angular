import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product.interface';

import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private myShoppingCar: Product[] = [];
  private myCar = new BehaviorSubject<Product[]>([]);

  myCar$ = this.myCar.asObservable();

  constructor() { }

  addProducto(product: Product) {
    this.myShoppingCar.push(product);
    this.myCar.next(this.myShoppingCar);
  }

  getShoppingCar(): Product[] {
    return this.myShoppingCar;
  }

  getTotal(): number {
    return parseFloat(this.myShoppingCar.reduce((sum, product) => sum + product.price, 0).toFixed(2));
  }
}
