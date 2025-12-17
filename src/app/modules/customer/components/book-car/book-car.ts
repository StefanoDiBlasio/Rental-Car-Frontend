import { Component } from '@angular/core';
import { Customer } from '../../services/customer';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@Component({
  selector: 'app-book-car',
  imports: [
    RouterLink,
    NzSpinModule,
    NzFormModule,
    NzButtonModule,
    NzInputModule,
    NzLayoutModule,
    NzSelectModule,
    ReactiveFormsModule
  ],
  templateUrl: './book-car.html',
  styleUrl: './book-car.scss',
})
export class BookCar {

  car: any;
  carId!:number;

  constructor(private customerService: Customer,
     private activatedRoute: ActivatedRoute,
      private message: NzMessageService) {}

  ngOnInit() {
    this.carId = Number(this.activatedRoute.snapshot.params["id"]);
    this.getCarById();
  }

  getCarById() {
    this.customerService.getCarById(this.carId).subscribe({
      next: (res:any) => {
        console.log(res);
        this.car = res;
      },
      error: (err) => {
        console.log(err);
        this.message.error("C'è stato un problema con il reperimento dei dati dell'auto.");
      }
    })
  }

}

