import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css',
})
export class EditProductComponent {
  productService = inject(ProductService);
  route = inject(ActivatedRoute);
  productId!: string | undefined;
  router = inject(Router);

  addProductForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    image: new FormControl('', []),
    category: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    brand: new FormControl(''),
    description: new FormControl(''),
    rating: new FormControl(''),
  });
  ngOnInit() {
    this.route.params.subscribe((param) => {
      this.productId = param['id'];
      this.productService.getProductDetail(param['id']).subscribe({
        next: (data) => {
          console.log(data);
          this.productId = param[`id`];
          this.addProductForm.patchValue(data);
        },
        error: (error) => {
          // show thong bao error
          console.error(error);
        },
      });
    });
  }

  handleSubmit() {
    if (!this.productId) return;
    this.productService
      .editProduct(this.productId, this.addProductForm.value)
      .subscribe({
        next: () => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Sửa sản phẩm thành công!!!',
            showConfirmButton: false,
            timer: 1500,
          });
          this.router.navigate(['/admin/products']);
        },
        error: (error) => {
          console.error(error.message);
        },
      });
  }
}
