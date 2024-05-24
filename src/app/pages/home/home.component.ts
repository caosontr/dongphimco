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
  ngOnChanges() {
    console.log('1 -ngOnChanges');
  }

  ngOnInit(): void {
    console.log(' 2- ngOnInit');
  }
  ngDoCheck() {
    console.log('3 -ngDoCheck');
  }

  ngAfterContentInit() {
    console.log('4 -ngAfterContentInit');
  }

  ngAfterContentChecked() {
    console.log('5 -ngAfterContentChecked');
  }

  ngAfterViewInit() {
    console.log('6 -ngAfterViewInit');
  }
  ngAfterViewChecked() {
    console.log('7 -ngAfterViewChecked');
  }
  ngOnDestroy() {
    console.log('8- ngOnDestroy');
  }
}
