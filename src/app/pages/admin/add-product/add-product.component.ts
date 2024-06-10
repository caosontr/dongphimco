import { Component, inject } from '@angular/core';
import Swal from 'sweetalert2';
import { ProductService } from '../../../services/product.service';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent {
  productService = inject(ProductService); // inject vao bien
  router = inject(Router);

  productAdd = {
    name: '',
    price: 0,
    brand: '',
    description: '',
    image: '',
    rating: 0,
    category: ' ',
  };

  handleSubmit() {
    this.productService.createProduct(this.productAdd).subscribe(
      (response) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Tạo sản phẩm thành công!!!',
          showConfirmButton: false,
          timer: 1500,
        });
        this.router.navigate(['/admin/products']);
      },
      (error) => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Có lỗi xảy ra khi tạo sản phẩm!!!',
          showConfirmButton: true,
        });
        console.error('Error creating product:', error);
      }
    );
  }
}
