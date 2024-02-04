import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {

  data: any;
  user: any;
  employees: any;
  users: any;
  constructor() { }

  getData(key: any): any {
    if (key === 'users') {
      this.data = localStorage.getItem('users')
      this.data = this.data ? JSON.parse(this.data) : []
      return this.data
    } else {
      this.data = localStorage.getItem('employees')
      this.data = this.data ? JSON.parse(this.data) : []
      return this.data
    }

  }

  storeData(storage: any, key: any, value: any): any {
    if (key === 'user' && storage === 'session') {
      sessionStorage.setItem('user', JSON.stringify(value))
    } else if (key === 'users' && storage === 'local') {
      localStorage.setItem('users', JSON.stringify(value))
    } else if (key === 'employees' && storage === 'local') {
      localStorage.setItem('employees', JSON.stringify(value))
    }
  }

  generatePwd(): any {
    let chars = 'Z*a&9Sx^Dc%V6$fG#b@7N3h!Jm~4Kl`Op/Iu?Y.tR;e2Wq:zAx]Sx[Cd|F\vB-F0g5Hj8MnkL1+'
    let pwd = ''
    for (let i = 0; i < 8; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return pwd
  }

  storeNewUsers(): void {
    this.employees = this.getData('employees');
    let _employee: any;
    let doesUserExist: boolean;
    this.users = this.getData('users')
    this.employees.forEach((employee: any, indx: number) => {
      doesUserExist = false;
      this.users.forEach((user: any, indx: number) => {
        if (employee.Email === user.email) {
          doesUserExist = true;
          // doesUserExist = doesUserExist
        }
      })
      if (!doesUserExist) {
        this.users.push({
          email: employee.Email,
          firstName: employee.Name,
          lastName: employee.Surname,
          password: this.generatePwd(),
          role: employee.Department.toLowerCase() == 'hr' ? 'admin' :
            employee.Department.toLowerCase() == 'operations' ? 'operations personnel' :
            employee.Occupation.toLowerCase() == 'manager' ? 'manager' : 'employee'
        })
      }
    })
    console.log(this.users)
    console.log(this.employees)
    this.storeData('local', 'users', this.users)
  }


}
