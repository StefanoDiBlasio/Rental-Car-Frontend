import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Storage } from '../../../auth/components/services/storage/storage';

const BASE_URL = ["http://localhost:8080"]

@Injectable({
  providedIn: 'root',
})
export class Admin {
  
  constructor(private http: HttpClient) {}

  postCar(carDto:any):Observable<any> {
    return this.http.post(BASE_URL + "/api/v1/auto/add", carDto, {
      headers:this.createAuthorizationHeader()
    })
  }

  getAllCars(): Observable<any> {
    return this.http.get(BASE_URL + "/api/v1/auto/all", {
      headers: this.createAuthorizationHeader()
    })
  }

  deleteCar(id:number): Observable<any> {
    return this.http.delete(BASE_URL + "/api/v1/auto/" + id, {
      headers: this.createAuthorizationHeader()
    });
  }

  getCarById(id: number): Observable<any> {
    return this.http.get(BASE_URL + "/api/v1/auto/" + id, {
      headers: this.createAuthorizationHeader()
    });
  }

  updateCar(carId:number, carDto: any): Observable<any>{  
    return this.http.put(BASE_URL + "/api/v1/auto/" + carId, carDto, {
      headers: this.createAuthorizationHeader()
    })
  }

  getAllBookings(): Observable<any> {
    return this.http.get(BASE_URL + "/api/v1/prenotazione/all", {
      headers: this.createAuthorizationHeader()
    })
  }

  approveBooking(bookingId:number): Observable<any> {
    return this.http.put(BASE_URL + "/api/v1/prenotazione/approve/" + bookingId, {
      headers: this.createAuthorizationHeader()
    })
  }

  rejectBooking(bookingId:number): Observable<any> {
    return this.http.put(BASE_URL + "/api/v1/prenotazione/reject/" + bookingId, {
      headers: this.createAuthorizationHeader()
    })
  }

  createAuthorizationHeader(): HttpHeaders {
    let authHeaders: HttpHeaders = new HttpHeaders();
    return authHeaders.set(
      'Authorization',
      'Bearer ' + Storage.getToken()
    );
  }
}
