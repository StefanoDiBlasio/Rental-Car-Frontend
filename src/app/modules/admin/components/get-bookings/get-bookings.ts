import { Component } from '@angular/core';
import { Admin } from '../../services/admin';
import { CommonModule } from '@angular/common';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-get-bookings',
  imports: [
    CommonModule,
    NzTableModule,
    NzSpinModule,
    NzButtonModule
  ],
  templateUrl: './get-bookings.html',
  styleUrl: './get-bookings.scss',
})
export class GetBookings {

  isSpinning = false;
  bookings:any;

  constructor(private adminService: Admin, private message: NzMessageService){
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
        this.message.error("Qualcosa è andato storto nel reperimento delle tue prenotazioni.", {nzDuration: 5000});
      }
    })
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

  private calculateBookingDays(startBooking:string | Date, endBooking:string | Date): number {
      const startDate = new Date(startBooking);
      const endDate = new Date(endBooking);

      const totalMs = endDate.getTime() - startDate.getTime();
      const totalDays = totalMs / (1000 * 60 * 60 * 24);
      return Math.ceil(totalDays);
  }
}
