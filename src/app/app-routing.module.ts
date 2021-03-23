import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarComponent } from './components/car/car.component';
import { CreditCardComponent } from './components/credit-card/credit-card.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RentalComponent } from './components/rental/rental.component';

const routes: Routes = [
  {path:"", pathMatch:"full", component:CarComponent},
  {path:"cars", component:CarComponent},
  {path:"cars/brand/:brandId", component:CarComponent},
  {path:"cars/color/:colorId", component:CarComponent},
  {path:"cars/cardetail/:carId", component:CarDetailComponent},
  {path:"cars/cars/cardetail/:carId", component:CarDetailComponent},
  {path:"cars/brand/:brandId/cars/cardetail/:carId", component:CarDetailComponent},
  {path:"cars/color/:colorId/cars/cardetail/:carId", component:CarDetailComponent},
  {path:"rentals", component:RentalComponent},
  {path:"creditcards", component:CreditCardComponent},
  {path:"customers", component:CustomerComponent},
  {path:"cars/add", component:CarAddComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
