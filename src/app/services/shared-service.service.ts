import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {

  data: any;
  user: any
  constructor() { }

  getData(key: any): any {
    if (key === 'users') {
      this.data = localStorage.getItem('users')
      this.data = this.data ? JSON.parse(this.data) : []
      return this.data
    }else {
      this.data = localStorage.getItem('employees')
      this.data = this.data ? JSON.parse(this.data) : []
      return this.data
    }

  }

  storeData(storage:any, key:any, value: any): any {
    if(key === 'user' && storage === 'session') {
       sessionStorage.setItem('user', JSON.stringify(value))
    }else if(key === 'employees' && storage === 'local') {  
      localStorage.setItem('employees', JSON.stringify(value))
    }
  }

  generatePwd(): void {
    let chars = 'Z*a&9Sx^Dc%V6$fG#b@7N3h!Jm~4Kl`Op/Iu?Y.tR;e2Wq:zAx]Sx[Cd|F\vB-F0g5Hj8MnkL1+'
    let pwd = ''
    for(let i = 0; i < 8; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    console.log(pwd)
  }


}
