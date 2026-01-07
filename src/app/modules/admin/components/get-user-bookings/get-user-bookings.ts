import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSelectModule, NzSelectComponent } from 'ng-zorro-antd/select';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTableModule } from 'ng-zorro-antd/table';
import { Admin } from '../../services/admin';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-get-user-bookings',
  imports: [
    NzFormModule,
    NzSelectModule,
    CommonModule,
    NzTableModule,
    NzSpinModule,
    NzButtonModule,
    ReactiveFormsModule,
    NzDatePickerModule
  ],
  templateUrl: './get-user-bookings.html',
  styleUrl: './get-user-bookings.scss',
})
export class GetUserBookings {

  isSpinning = false;
  bookings:any[] = [];
  userId!: number;

  searchBookingForm!: FormGroup;
  cars: any = [];
  listOfBrands = ["Volkswagen", "Audi", "KIA", "Honda"];
  listOfModels = ["Golf 1.5 TSI Edition Plus", "A3 TDI Sportback", "Sportage 1.5 GPL", "Civic FK7 1.5"];
  listOfStatus = ["APPROVATA", "RIFIUTATA", "IN_ATTESA"];
  
  constructor(private adminService: Admin, private message: NzMessageService, private fb: FormBuilder, private route: ActivatedRoute){
    this.searchBookingForm = this.fb.group({
      id: [null],
      firstName: [null],
      lastName: [null],
      casaCostruttrice: [null],
      modello: [null],
      targa: [null],
      status: [null],
      inizioPrenotazione: [null],
      finePrenotazione: [null]
    });
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.getUserBookings();
  }

  getUserBookings(){
    this.isSpinning = true;
    this.adminService.getAllUserBookings(this.userId).subscribe({
      next: (res:any) => {
        console.log(res);
        this.isSpinning = false;
        this.bookings = res.map((b:any) => ({
          ...b,
          days: this.calculateBookingDays(b.inizioPrenotazione, b.finePrenotazione)
        }));
      },
      error: () => {
        this.message.error("Qualcosa è andato storto nel reperimento delle prenotazioni.", {nzDuration: 5000});
      }
    })
  }

    private calculateBookingDays(startBooking:string | Date, endBooking:string | Date): number {
      const startDate = new Date(startBooking);
      const endDate = new Date(endBooking);

      const totalMs = endDate.getTime() - startDate.getTime();
      const totalDays = totalMs / (1000 * 60 * 60 * 24);
      return Math.ceil(totalDays);
  }

    approveBooking(bookingId:number) {
    this.isSpinning = true;
    this.adminService.approveBooking(bookingId).subscribe({
      next: (res:any) => {
        this.isSpinning = false;
        console.log(res);
        this.getUserBookings();
        this.message.success("Prenotazione approvata con successo!", {nzDuration: 5000});
      },
      error: () => {
        this.message.error("Qualcosa è andato storto durante l'approvazione della prenotazione.");
      }
    })
  }

  rejectBooking(bookingId:number) {
    this.isSpinning = true;
    this.adminService.rejectBooking(bookingId).subscribe({
      next: (res:any) => {
        this.isSpinning = false;
        console.log(res);
        this.getUserBookings();
        this.message.success("Prenotazione rifiutata con successo!", {nzDuration: 5000});
      },
      error: () => {
        this.message.error("Qualcosa è andato storto durante il rifiuto della prenotazione.");
      }
    })
  }
}
