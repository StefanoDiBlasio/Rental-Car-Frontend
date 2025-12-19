import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Storage } from '../../../auth/components/services/storage/storage';

const BASE_URL = ["http://localhost:8080"];

@Injectable({
  providedIn: 'root',
})
export class Customer {
  
  constructor(private http: HttpClient) {}

  getAllCars(): Observable<any> {
    return this.http.get(BASE_URL + "/api/v1/auto/all", {
      headers: this.createAuthorizationHeader()
    })
  }

  getCarById(carId:number): Observable<any> {
    return this.http.get(BASE_URL + "/api/v1/auto/" + carId, {
      headers: this.createAuthorizationHeader()
    })
  }

  bookCar(bookCarDto:any): Observable<any> {
    return this.http.post(BASE_URL + "/api/v1/prenotazione/add", bookCarDto, {
      headers: this.createAuthorizationHeader()
    })
  }

  getBookingsByUserId(): Observable<any> {
    return this.http.get(BASE_URL + "/api/v1/prenotazione/all/" + Storage.getUserId(), {
      headers: this.createAuthorizationHeader()
    })
  }

    searchFilteredCars(searchCarDto: any): Observable<any> {
    let params = new HttpParams();
    Object.keys(searchCarDto).forEach(key => {
    const value = searchCarDto[key];
    if (value !== null && value !== undefined && value !== '') {
      params = params.set(key, value.toString());
    }
    });
    return this.http.get(BASE_URL + '/api/v1/auto/search', {
        headers: this.createAuthorizationHeader(),
        params
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
