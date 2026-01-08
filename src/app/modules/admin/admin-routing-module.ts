import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboard } from './components/admin-dashboard/admin-dashboard';
import { PostCar } from './components/post-car/post-car';
import { UpdateCar } from './components/update-car/update-car';
import { GetBookings } from './components/get-bookings/get-bookings';
import { SearchCar } from './components/search-car/search-car';
import { UpdateCustomer } from './components/update-customer/update-customer';
import { GetUserBookings } from './components/get-user-bookings/get-user-bookings';

const routes: Routes = [
  {path: "dashboard", component: AdminDashboard},
  {path: "car", component: PostCar},
  {path: "car/:id", component: UpdateCar},
  {path: "bookings", component: GetBookings},
  {path: "customer/:id/bookings", component: GetUserBookings},
  {path: "search", component: SearchCar},
  {path: "customer/:id", component: UpdateCustomer}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
