import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDeleteComponent } from './components/car-delete/car-delete.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarImageComponent } from './components/car-image/car-image.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { CreditCardComponent } from './components/credit-card/credit-card.component';
import { CustomerComponent } from './components/customer/customer.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RentalComponent } from './components/rental/rental.component';
import { UserUpdateComponent } from './components/user-update/user-update.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path:"", pathMatch:"full", component:CarComponent},
  {path:"cars", component:CarComponent},
  {path:"cars/brand/:brandId", component:CarComponent},
  {path:"cars/color/:colorId", component:CarComponent},
  {path:"cars/filter/:brandId/:colorId", component:CarComponent},
  {path:"cars/car/:carId", component:CarDetailComponent},
  {path:"cars/cardetails", component:CarDetailComponent},
  {path:"cars/cardetails2", component:CarImageComponent},
  {path:"cars/cardetails2/:carId", component:CarImageComponent},
  {path:"cars/rental", component:CreditCardComponent, canActivate:[LoginGuard]},
  {path:"cars/brand/:brandId/cars/cardetail/:carId", component:CarDetailComponent},
  {path:"cars/color/:colorId/cars/cardetail/:carId", component:CarDetailComponent},
  {path:"register",component:RegisterComponent},
  {path:"rentals", component:RentalComponent},
  {path:"customers", component:CustomerComponent},
  {path:"cars/addcar", component:CarAddComponent, canActivate:[LoginGuard]},
  {path:"cars/update/:carId", component:CarUpdateComponent,canActivate:[LoginGuard]},
  {path:"cars/delete", component:CarDeleteComponent},
  {path:"brands/addbrand", component:BrandAddComponent,canActivate:[LoginGuard]},
  {path:"colors/addcolor", component:ColorAddComponent,canActivate:[LoginGuard]},
  {path:"login", component:LoginComponent},
  {path:"updateuser",component:UserUpdateComponent},
  {path:"cars/brand/:brandId",component:BrandUpdateComponent,canActivate:[LoginGuard]},
  {path:"cars/color/:colorId",component:ColorUpdateComponent,canActivate:[LoginGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
