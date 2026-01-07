import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Storage } from '../../../auth/components/services/storage/storage';

const BASE_URL = ["http://localhost:8080"]

@Injectable({
  providedIn: 'root',
})
export class Admin {
  
  constructor(private http: HttpClient) {}

  getAllCustomers(): Observable<any> {
    return this.http.get(BASE_URL + "/api/v1/user/all/customers", {
      headers: this.createAuthorizationHeader()
    })
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(BASE_URL + "/api/v1/user/" + id, {
      headers: this.createAuthorizationHeader()
    });
  }

  updateCustomer(userId:number, userDto: any): Observable<any>{  
    return this.http.put(BASE_URL + "/api/v1/user/" + userId, userDto, {
      headers: this.createAuthorizationHeader()
    })
  }

  disableUser(userId:any): Observable<any> {
    return this.http.put(BASE_URL + "/api/v1/user/disable/" + userId, {
      headers: this.createAuthorizationHeader(),
      responseType: 'text' as const
    })
  }

  enableUser(userId:any): Observable<any> {
    return this.http.put(BASE_URL + "/api/v1/user/enable/" + userId, {
      headers: this.createAuthorizationHeader(),
      responseType: 'text' as const
    })
  }

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

  searchBookings(params: any): Observable<any[]> {
    return this.http.get<any[]>(BASE_URL + '/api/v1/prenotazione/search', 
      { params, headers: this.createAuthorizationHeader() });
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
