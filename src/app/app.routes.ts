import { Routes } from '@angular/router';
import { Signup } from './auth/components/signup/signup';
import { Login } from './auth/components/login/login';

export const routes: Routes = [
    {path: "register", component: Signup},
    {path: "login", component: Login},
    {path: "admin", loadChildren: () => import("./modules/admin/admin-module").then(m => m.AdminModule)},
    {path: "customer", loadChildren: () => import("./modules/customer/customer-module").then(m => m.CustomerModule)}
];
