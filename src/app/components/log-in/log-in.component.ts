import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SharedServiceService } from 'src/app/services/shared-service.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent {
  
  users: any;
  userCredentials: any = {email: '', password: ''}
  emailPattern: any = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/

  constructor(private sharedService: SharedServiceService, private router: Router, 
    private snackBar: MatSnackBar) {}

  submit(form: NgForm): any {
    if(!form.valid) return

    this.users = this.sharedService.getUsers()
    console.log(this.users)
    let user = this.users.find((user: any) => user.email === this.userCredentials.email)
    if(user) {
      if(user.password === this.userCredentials.password) {
        this.router.navigate(['/landing'])
        this.sharedService.storeUsers(user)
      }else {
        this.snackBar.open('Password is incorrect', 'OK', {duration: 3000})
      }
    }else {
      this.snackBar.open('User does not exist', 'OK' , {panelClass: 'pos-snackbar'})
    }
  }
}
