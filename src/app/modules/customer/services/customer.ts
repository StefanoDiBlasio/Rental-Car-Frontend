import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  createAuthorizationHeader(): HttpHeaders {
  let authHeaders: HttpHeaders = new HttpHeaders();
  return authHeaders.set(
    'Authorization',
    'Bearer ' + Storage.getToken()
  );
  }
}
