import { Product } from './../../types/Product';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../../components/footer/footer.component';
import { ErrorPageComponent } from '../error-page/error-page.component';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    FormsModule,
    HeaderComponent,
    FooterComponent,
    ErrorPageComponent,
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent {
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  product!: Product | undefined;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const productId = params['id'];
      console.log(productId); // Check if ID is captured correctly

      this.productService.getProductDetail(productId).subscribe({
        next: (data: Product) => {
          console.log(data); // Check received data
          this.product = data;
        },
        error: (error) => {
          console.error(error);
          this.router.navigate(['/404']);
        },
      });
    });
  }
}
