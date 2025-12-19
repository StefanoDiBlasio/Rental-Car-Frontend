import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerDashboard } from './components/customer-dashboard/customer-dashboard';
import { BookCar } from './components/book-car/book-car';
import { MyBookings } from './components/my-bookings/my-bookings';
import { SearchCar } from './components/search-car/search-car';

const routes: Routes = [
  {path: "dashboard", component: CustomerDashboard},
  {path: "book/:id", component: BookCar},
  {path: "my_bookings", component: MyBookings},
  {path: "car/search", component: SearchCar}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
