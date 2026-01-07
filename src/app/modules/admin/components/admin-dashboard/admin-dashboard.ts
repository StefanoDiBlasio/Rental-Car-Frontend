import { Component } from '@angular/core';
import { Admin } from '../../services/admin';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router, RouterModule } from '@angular/router';
import { FormGroup } from '@angular/forms';


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
  customers: any = [];

  isSpinning = false;
  carId!:number;
  updateForm!: FormGroup;

  constructor(private adminService: Admin, private message: NzMessageService, private router: Router) {}

  ngOnInit(){
    this.getAllCustomers();
  }

  getAllCustomers() {
    this.adminService.getAllCustomers().subscribe({
      next: (res:any) => {
        console.log(res);
        this.customers = res;
      },
      error : (err) => {
        console.log(err);
        this.message.error("Qualcosa è andato storto nel caricamento dei customers.")
      }
    })
  }

  enableUser(userId:number) {
    this.isSpinning = true;
    
    this.adminService.enableUser(userId).subscribe({
      next: () => {
        this.isSpinning = false;
        const customer = this.customers.find((x: any) => x.id === userId);
        if (customer) customer.enabled = true;
        this.message.success("Utente abilitato con successo!", {nzDuration: 5000});
        this.router.navigateByUrl("/admin/dashboard");
      },
      error: (err) => {
        console.log(err);
        this.message.error("C'è stato un errore durante l'abilitazione dell'utente.", {nzDuration: 5000});
      }
    })
  }

  disableUser(userId:number) {
    this.isSpinning = true;
    this.adminService.disableUser(userId).subscribe({
      next: () => {
        this.isSpinning = false;
        const customer = this.customers.find((x: any) => x.id === userId);
        if (customer) customer.enabled = false;
        this.message.success("Utente disabilitato con successo!", {nzDuration: 5000});
        this.router.navigateByUrl("/admin/dashboard");
      },
      error: (err) => {
        console.log(err);
        this.message.error("C'è stato un errore durante la disabilitazione dell'utente.", {nzDuration: 5000});
      }
    })
  }

  getAllCars() {
    this.adminService.getAllCars().subscribe({
      next: (res:any) => {
        console.log(res);
        this.cars = res;
      },
      error : (err) => {
        console.error(err);
        this.message.error("Qualcosa è andato storto nel caricamento del parco auto.")
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
