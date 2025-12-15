import { Injectable } from '@angular/core';

const TOKEN = "token";
const USER = "user";

@Injectable({
  providedIn: 'root',
})
export class Storage {
  constructor() {}

  //metodo per rimuovere il token da local storage
  static saveToken(token: string):void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }

  static saveUser(user: any):void {
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
  }

  static getToken() {
    return localStorage.getItem(TOKEN);
  }

  static getUser() {
    const user = localStorage.getItem(USER);
    return user ? JSON.parse(user) : null;
  }

  static getUserRole():string {
    const user = this.getUser();
    if(user == null) return "";
    return user.role;
  }

  static isAdminLoggedIn():boolean {
    if(this.getToken() == null) return false;
    const role:string = this.getUserRole();
    return role == "SUPERADMIN";
  }

  static isCustomerLoggedIn():boolean {
    if(this.getToken() == null) return false;
    const role:string = this.getUserRole();
    return role == "CUSTOMER";
  }
}
