import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product, CreateProductDTO, UpdateProduct } from '../interfaces/product.interface';
import { retry, catchError, throwError, map, zip } from 'rxjs';

import { environment } from './../../environments/environment';
import { checkTime } from '../interceptors/time.interceptor';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private url: string = `${ environment.API_URL }/api/`;

  constructor(
    private http: HttpClient
  ) { }

  getProductos(offset?: number, limit?: number) {
    let params = new HttpParams();
    if (limit !== undefined && offset !== undefined) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product[]>(this.url + 'products', {params, context: checkTime()})
    .pipe(
      retry(3),
      map((response) => response.map(product =>{
        return {
          ...product,
          taxes: parseFloat((.19 * product.price).toFixed(2))
        }

      }))
    );
  }

  getProducto(id: number) {
    return this.http.get<Product>(`${this.url}products/${id}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if(error.status === 404) {
            return throwError('Ups')
          }
          if(error.status === 500) {
            return throwError('Ups')
          }
          return throwError('Ups')
        } )
      )
  }

  fetchReadAndUpdate(id: number, update: UpdateProduct) {
    return zip(
      this.getProducto(id),
      this.update(update, id)
    );
  }

  createProduct(product: CreateProductDTO) {
    return this.http.post<Product>(`${this.url}products`, product);
  }

  update(product: UpdateProduct, id: number) {
    return this.http.put<Product>(`${this.url}products/${id}`, product);
  }

  delete(id: number) {
    return this.http.delete<boolean>(`${this.url}products/${id}`);
  }
}
