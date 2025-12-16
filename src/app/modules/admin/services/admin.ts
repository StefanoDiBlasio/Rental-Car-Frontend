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

  createAuthorizationHeader(): HttpHeaders {
    let authHeaders: HttpHeaders = new HttpHeaders();
    return authHeaders.set(
      'Authorization',
      'Bearer ' + Storage.getToken()
    );
  }
}
