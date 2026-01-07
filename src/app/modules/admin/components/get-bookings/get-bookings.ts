import { Component } from '@angular/core';
import { Admin } from '../../services/admin';
import { CommonModule } from '@angular/common';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NzFormItemComponent, NzFormModule } from 'ng-zorro-antd/form';
import { NzColDirective } from 'ng-zorro-antd/grid';
import { NzSelectModule, NzSelectComponent } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

@Component({
  selector: 'app-get-bookings',
  imports: [
    NzFormItemComponent,
    NzFormModule,
    NzSelectModule,
    NzColDirective,
    CommonModule,
    NzTableModule,
    NzSpinModule,
    NzButtonModule,
    ReactiveFormsModule,
    NzSelectComponent,
    NzDatePickerModule
  ],
  templateUrl: './get-bookings.html',
  styleUrl: './get-bookings.scss',
})
export class GetBookings {

  isSpinning = false;
  bookings:any;
  searchBookingForm!: FormGroup;
  cars: any = [];
  listOfBrands = ["Volkswagen", "Audi", "KIA", "Honda"];
  listOfModels = ["Golf 1.5 TSI Edition Plus", "A3 TDI Sportback", "Sportage 1.5 GPL", "Civic FK7 1.5"];
  listOfStatus = ["APPROVATA", "RIFIUTATA", "IN_ATTESA"];

  constructor(private adminService: Admin, private message: NzMessageService, private fb: FormBuilder){
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

    this.getBookings();
  }

  getBookings(){
    this.isSpinning = true;
    this.adminService.getAllBookings().subscribe({
      next: (res:any) => {
        console.log(res);
        this.isSpinning = false;
        this.bookings = res.map((b:any) => ({
          ...b,
          username: res.userId,
          days: this.calculateBookingDays(b.inizioPrenotazione, b.finePrenotazione)
        }));
      },
      error: () => {
        this.message.error("Qualcosa è andato storto nel reperimento delle prenotazioni.", {nzDuration: 5000});
      }
    })
  }

  searchFilteredBookings(){
    this.isSpinning = true;
    const filters = { ...this.searchBookingForm.value };
    filters.annoImmatricolazione = filters.annoImmatricolazione ? Number(filters.annoImmatricolazione) : null;
    this.adminService.searchFilteredCars(filters).subscribe({
      next: (res:any) => {
        this.cars = [];
        console.log(res);
        this.isSpinning = false;
        res.forEach((car:any) => {
          this.cars.push(car);
        });
        this.message.success("Ricerca filtrata con successo!", {nzDuration:5000});
      },
      error: () => {
        this.message.error("Qualcosa è andato storto durante la ricerca filtrata.", {nzDuration:5000});
      }
    })
  }

  searchBookings() {
    this.isSpinning = true;

    const raw = this.searchBookingForm.value;

    const params: any = {
      id: raw.id,
      firstName: raw.firstName,
      lastName: raw.lastName,
      casaCostruttrice: raw.casaCostruttrice,
      modello: raw.modello,
      targa: raw.targa,
      status: raw.status,
      inizioPrenotazione: raw.inizioPrenotazione
        ? raw.inizioPrenotazione.toISOString().split('T')[0]
        : null,
      finePrenotazione: raw.finePrenotazione
        ? raw.finePrenotazione.toISOString().split('T')[0]
        : null
    };

    this.adminService.searchBookings(params).subscribe({
      next: (res: any[]) => {
        this.bookings = res.map(b => ({
          ...b,
          days: this.calculateBookingDays(
            b.inizioPrenotazione,
            b.finePrenotazione
          )
        }));
        console.log(this.bookings);
        this.isSpinning = false;
      },
      error: (err) => {
        this.isSpinning = false;
        console.log(err);
        this.message.error("Errore nella ricerca");
      }
    });
  }

  approveBooking(bookingId:number) {
    this.isSpinning = true;
    this.adminService.approveBooking(bookingId).subscribe({
      next: (res:any) => {
        this.isSpinning = false;
        console.log(res);
        this.getBookings();
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
        this.getBookings();
        this.message.success("Prenotazione rifiutata con successo!", {nzDuration: 5000});
      },
      error: () => {
        this.message.error("Qualcosa è andato storto durante il rifiuto della prenotazione.");
      }
    })
  }

  reset(): void {
    this.searchBookingForm.reset();
    this.getBookings();
  }

  private calculateBookingDays(startBooking:string | Date, endBooking:string | Date): number {
      const startDate = new Date(startBooking);
      const endDate = new Date(endBooking);

      const totalMs = endDate.getTime() - startDate.getTime();
      const totalDays = totalMs / (1000 * 60 * 60 * 24);
      return Math.ceil(totalDays);
  }
}
