import { Routes } from '@angular/router';
import { AccountComponent } from './pages/account/account.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Viva Store' },
  { path: 'produto/:id', component: ProductDetailComponent, title: 'Produto | Viva Store' },
  { path: 'login', component: LoginComponent, title: 'Entrar | Viva Store' },
  { path: 'minha-conta', component: AccountComponent, title: 'Minha conta | Viva Store' },
  { path: '**', redirectTo: '' },
];
