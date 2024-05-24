import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../types/Product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

// class Student > const studentA = new Student -> instance
export class ProductService {
  // instance
  http = inject(HttpClient);
  apiURL = 'https://caosontr-nodejs.onrender.com/products';
  // apiURL = 'https://fakestoreapi.com/products';

  constructor() {}
  searchProducts(name: string): Observable<any> {
    return this.http.get(`${this.apiURL}/search?name=${name}`);
  }
  // getAllProducts
  getAllProducts() {
    return this.http.get<Product[]>(this.apiURL);
  }
  // getProductDetail
  getProductDetail(id: string) {
    return this.http.get<Product>(`${this.apiURL}/${id}`);
  }
  // createProduct
  // updateProduct
  // deleteProduct
  handleDeleteProduct(productId: string) {
    const url = `${this.apiURL}/${productId}`;
    return this.http.delete(url);
  }
}