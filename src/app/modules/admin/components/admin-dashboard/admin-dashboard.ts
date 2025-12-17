import { Component } from '@angular/core';
import { Admin } from '../../services/admin';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzMessageService } from 'ng-zorro-antd/message';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NzCardModule,
    NzButtonModule,
    NzGridModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.scss',
})
export class AdminDashboard {

  cars: any = [];

  constructor(private adminService: Admin, private message: NzMessageService) {}

  ngOnInit(){
    this.getAllCars();
  }

  getAllCars() {
    this.adminService.getAllCars().subscribe({
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

  deleteCar(id:number) {
    console.log(id);
    this.adminService.deleteCar(id).subscribe({
      next: (res:any) => {
        this.getAllCars();
        this.message.success("Auto eliminata con successo!", {nzDuration: 5000})
      },
      error : (err) => {
        this.message.error("Si è verificato un errore nell'eliminazione dell'auto.")
      }
    })
  }
}
