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
  category: ' '

  };

  handleSubmit() {
    this.productService
      .createProduct(this.productAdd)
      .subscribe(() => this.router.navigate(['/admin/products']));
  }
}