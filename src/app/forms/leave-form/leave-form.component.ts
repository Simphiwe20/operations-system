import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedServiceService } from 'src/app/services/shared-service.service';

@Component({
  selector: 'app-leave-form',
  templateUrl: './leave-form.component.html',
  styleUrls: ['./leave-form.component.scss']
}) 
export class LeaveFormComponent {
  leaveTypes: string[] = ['Annual Leave', 'Sick Leave', 'Family Responsibility Leave']
  leaveFormData: any;
  leaveForm: any = {
    appID: '',
    leaveType: '',
    startDate: '',
    endDate: '',
    days: 0,
    status: 'Submitted'
  }
  user: any;
  id: any = Number(`${new Date().getFullYear()}0001`)


  constructor(private sharedServices: SharedServiceService, private dialogRef: MatDialogRef<LeaveFormComponent>, 
    private snackBar: MatSnackBar) {
    this.leaveFormData = this.sharedServices.getData('local', 'leaves')
    this.user = this.sharedServices.getData('session', 'user')
    console.log(this.leaveFormData)
  }
  
  submit(form: NgForm): void {
    if(form.valid) {
      console.log(this.leaveForm)
      this.leaveForm['appID'] = `leave-${this.id}`
      this.leaveForm['days'] =  new Date(this.leaveForm['endDate']).getDate() - new Date(this.leaveForm['startDate']).getDate()
      this.leaveForm['employeeName'] = `${this.user.firstName} ${this.user.lastName}`
      this.leaveForm['email'] = `${this.user.email}`
      console.log(this.leaveForm)
      this.leaveFormData.push(this.leaveForm)
      this.id++
      this.sharedServices.storeData('local', 'leaves', this.leaveFormData)
      this.close('Leave applied sucessfully')
      console.log(this.id)
      
    }
    // this.close('Leave applied sucessfully')
  }

  close(message:string =''): void {
    this.dialogRef.close(message) 
  }

}
