import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../../types/Product';
import { ProductService } from '../../services/product.service';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products-list-home',
  standalone: true,
  imports: [NgFor, FormsModule, RouterLink],
  templateUrl: './products-list-home.component.html',
  styleUrl: './products-list-home.component.css'
})
export class ProductsListHomeComponent implements OnInit {
  readonly productService = inject(ProductService);

  productList: Product[] = [];
  filteredProducts: Product[] = this.productList;

  ngOnInit(): void {
    this.productService
    .getAllProducts()
    .subscribe({
        next: (products) => {
          this.productList = products;
          this.filteredProducts = products;
        },
        error: (error) => console.error('Error fetching products', error)
      });
  }

  searchProduct(productName: string): void {
    this.filteredProducts = this.productList.filter(product =>
      product.name.toLowerCase().includes(productName.toLowerCase())
    );
  }
}