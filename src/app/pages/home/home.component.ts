import { Component, inject } from '@angular/core'; 
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { NgFor } from '@angular/common';
import { ProductService } from '../../services/product.service'; 
import { Product } from '../../types/Product';
import { ProductsListHomeComponent } from '../../components/products-list-home/products-list-home.component';
import { BannerComponent } from '../../components/banner/banner.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, ProductsListHomeComponent, BannerComponent, FooterComponent, NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  productService = inject(ProductService);

  productList: Product[] = [];
  ngOnChanges() {}
  ngOnInit(): void {}
  ngDoCheck() {}
  ngAfterContentInit() {}
  ngAfterContentChecked() {}
  ngAfterViewInit() {}
  ngAfterViewChecked() {}
  ngOnDestroy() {}
}
