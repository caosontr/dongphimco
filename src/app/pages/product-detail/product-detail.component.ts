import {  Product } from './../../types/Product';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ErrorPageComponent } from '../error-page/error-page.component';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [NgIf , NgFor, FormsModule,HeaderComponent, FooterComponent, ErrorPageComponent],
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

  ngOnInit() {
    this.route.params.subscribe((param) => {
      console.log(param['id']);
      this.productService.getProductDetail(param['id']).subscribe({
        next: (data) => {
          console.log(data);
          this.product = data;
        },
        error: (error) => {
          console.error(error);
          this.router.navigate(['/404'])
        },
      });
    });
  }
  
}
