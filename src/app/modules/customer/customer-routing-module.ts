import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerDashboard } from './components/customer-dashboard/customer-dashboard';
import { BookCar } from './components/book-car/book-car';

const routes: Routes = [
  {path: "dashboard", component: CustomerDashboard},
  {path: "book/:id", component: BookCar}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
