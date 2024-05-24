import { Component, inject } from '@angular/core';
import { Product } from '../../../types/Product';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [NgFor, RouterLink, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductListComponent {
  products: Product[] = [];
  filteredProducts: Product[] = this.products;

  productService = inject(ProductService);
  ngOnInit(): void {
    this.loadProducts();
  }
  loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.filteredProducts = products;
      },
      error: (error) => {
        
        console.error(error.message);
      },
    });
  }
  
  searchProduct(productName: string): void {
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(productName.toLowerCase())
    );
  }
  
  handleDeleteProduct(productId: string | undefined): void {
    if (productId !== undefined) {
      Swal.fire({
        title: 'Xác nhận xóa?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Xóa',
        cancelButtonText: 'Hủy'
      }).then((result) => {
        if (result.isConfirmed) {
          this.productService.handleDeleteProduct(productId).subscribe(
            () => {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Xóa sản phẩm thành công!!!",
                showConfirmButton: false,
                timer: 1500
              });
              this.loadProducts();
              console.log(productId);
            },
            (error) => {
              console.error('Đã xảy ra lỗi khi xóa', error);
            }
          );
        }
      });
    }
  }
  
  
}