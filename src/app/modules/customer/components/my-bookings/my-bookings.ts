import { Component } from '@angular/core';
import { Customer } from '../../services/customer';
import { CommonModule } from '@angular/common';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTableModule } from 'ng-zorro-antd/table';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [
    CommonModule,
    NzTableModule,
    NzSpinModule,
  ],
  templateUrl: './my-bookings.html',
  styleUrl: './my-bookings.scss',
})
export class MyBookings {

  bookings:any;
  isSpinning = false;

  constructor(private customerService: Customer) {
    this.getMyBookings();
  }

  getMyBookings(){
    this.isSpinning = true;
    this.customerService.getBookingsByUserId().subscribe({
      next: (res:any) => {
        this.isSpinning = false;
        this.bookings = res.map((b:any) => ({
          ...b,
          days: this.calculateBookingDays(b.inizioPrenotazione, b.finePrenotazione)
        }));
      },
      error: (err) => {

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
