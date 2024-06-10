import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductListComponent } from './pages/admin/products/products.component';
import { AddProductComponent } from './pages/admin/add-product/add-product.component';
import { AdminComponent } from './layouts/admin/admin.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { EditProductComponent } from './pages/admin/edit-product/edit-product.component';
import { adminGuard } from './guard/admin.guard';
import { UserListComponent } from './pages/admin/user-list/user-list.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '404', component: ErrorPageComponent },

  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: 'products',
        canActivate: [adminGuard],
        component: ProductListComponent,
      },
      {
        path: 'users',
        canActivate: [adminGuard],
        component: UserListComponent,
      },
      {
        path: 'add-product',
        canActivate: [adminGuard],
        component: AddProductComponent,
      },
      {
        path: 'edit-product/:id',
        canActivate: [adminGuard],
        component: EditProductComponent,
      },
    ],
  },

  { path: 'product/:id', component: ProductDetailComponent },
  { path: '**', redirectTo: '/error' },
];
