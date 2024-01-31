import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {

  users: any;
  user: any
  constructor() { }

  getUsers(): any {
    this.users = localStorage.getItem('users')
    this.users = this.users ? JSON.parse(this.users) : []
    return this.users
  }

  storeUsers(value: any): any {
    sessionStorage.setItem('user', JSON.stringify(value))  
  }

}
