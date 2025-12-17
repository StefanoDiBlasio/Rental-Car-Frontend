import { Component } from '@angular/core';
import { Customer } from '../../services/customer';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzButtonComponent } from "ng-zorro-antd/button";
import { AdminRoutingModule } from "../../../admin/admin-routing-module";

@Component({
  selector: 'app-customer-dashboard',
  imports: [NzButtonComponent, AdminRoutingModule],
  templateUrl: './customer-dashboard.html',
  styleUrl: './customer-dashboard.scss',
})
export class CustomerDashboard {

  cars: any = [];

  constructor(private customerService: Customer,
    private message: NzMessageService
  ) {}

  ngOnInit(){
    this.getAllCars();
  }

  getAllCars() {
    this.customerService.getAllCars().subscribe({
      next: (res:any) => {
        console.log(res);
        this.cars = res;
      },
      error : (err) => {
        console.error(err);
        this.message.error("Si è verificato un errore nel caricamento del parco auto.")
      }
    })
  }
}
