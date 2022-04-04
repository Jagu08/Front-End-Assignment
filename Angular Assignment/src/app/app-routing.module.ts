import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressComponent } from './components/address/address.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { CartComponent } from './components/cart/cart.component';
import { HomeComponent } from './components/home/home.component';
import { SuccessComponent } from './components/success/success.component';

const routes: Routes = [
  {
    path:'login',
    component:LoginComponent
  },
  {
  path:'register',
  component:RegisterComponent
  },
  {
  path:'',
  component:HomeComponent
  },
  {
  path:'cart',
  component:CartComponent
  },
  {
      path:'success',
      component:SuccessComponent
      },
      {
        path:'address',
        component:AddressComponent
        },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
