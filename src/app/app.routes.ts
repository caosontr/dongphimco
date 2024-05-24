import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductListComponent,  } from './pages/admin/products/products.component';
import { AdminComponent } from './layouts/admin/admin.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';


export const routes: Routes = [
  
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '404', component: ErrorPageComponent },
  
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'products', component: ProductListComponent },
      
    ],
  },
  
  { path: 'product/:id', component: ProductDetailComponent  },
  { path: '**', redirectTo: '/error' }
];
