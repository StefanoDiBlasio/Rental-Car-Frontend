import { Component } from '@angular/core';
import { Customer } from '../../services/customer';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzDatePickerComponent } from "ng-zorro-antd/date-picker";
import { Storage } from '../../../../auth/components/services/storage/storage';

@Component({
  selector: 'app-book-car',
  imports: [
    NzSpinModule,
    NzFormModule,
    NzButtonModule,
    NzInputModule,
    NzLayoutModule,
    NzSelectModule,
    ReactiveFormsModule,
    NzDatePickerComponent
],
  templateUrl: './book-car.html',
  styleUrl: './book-car.scss',
})
export class BookCar {

  car: any;
  carId!:number;
  validateForm!: FormGroup;
  isSpinning = false;
  dateFormat:string = "yyyy-MM-dd";

  constructor(private customerService: Customer,
     private activatedRoute: ActivatedRoute,
      private message: NzMessageService,
      private fb: FormBuilder,
    private router: Router) {}

  ngOnInit() {
    this.carId = Number(this.activatedRoute.snapshot.params["id"]);
    this.validateForm = this.fb.group({
      inizioPrenotazione: [null, Validators.required],
      finePrenotazione: [null, Validators.required]
    });
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

  bookCar(data:any) {
    console.log(data);
    this.isSpinning = true;
    let bookCarDto = {
      finePrenotazione: data.finePrenotazione,
      inizioPrenotazione: data.inizioPrenotazione,
      userId: Storage.getUserId(),
      autoId: this.carId
    }
    console.log(bookCarDto);
    this.customerService.bookCar(bookCarDto).subscribe({
      next: (res:any) => {
        console.log(res);
        this.message.success("Richiesta di prenotazione inviata con successo!", {nzDuration: 5000});
        this.router.navigateByUrl("/customer/dashboard");
      },
      error: (err) => {
        console.log(err);
        this.message.error("Qualcosa è andato storto durante la prenotazione.", {nzDuration: 5000});
      }
    })
  }

}

