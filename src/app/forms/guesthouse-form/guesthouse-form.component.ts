import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SharedServiceService } from 'src/app/services/shared-service.service';

@Component({
  selector: 'app-guesthouse-form',
  templateUrl: './guesthouse-form.component.html',
  styleUrls: ['./guesthouse-form.component.scss']
})
export class GuesthouseFormComponent {

  guestHouseNames = ['Garden Court', 'Blue Waters', 'Premiers Hotel']
  guestHouseForm: any = {
    guestHouseName:'',
    checkInDate: '',
    checkOutDate: '',
    specialNeeds: '', 
    status: 'Submitted'  
  }
  guestHouseData: any;
  id: any = Number(`${new Date().getFullYear()}0001`)
  user: any;

  constructor(private sharedServices: SharedServiceService, private dialogRef: MatDialogRef<GuesthouseFormComponent>) {
    this.guestHouseData = this.sharedServices.getData('local', 'guesthouse')
    this.user = this.sharedServices.getData('session', 'user')
  }

  submit(form: NgForm) {
    if(form.valid) {
      if(this.guestHouseForm['specialNeeds'] === '') {
        this.guestHouseForm['specialNeeds'] = 'None'
      }
      this.guestHouseForm['reqID'] = `guestHouse-${this.id}`
      this.guestHouseForm['requestedBy'] = `${this.user.firstName} ${this.user.lastName}`
      this.guestHouseForm['requestedByEmail'] = `${this.user.email}`
      this.guestHouseData.push(this.guestHouseForm)
      console.log(this.guestHouseForm)
      this.sharedServices.storeData('local', 'guesthouse', this.guestHouseData)
      this.id++
    }
    this.close('GuestHouse request successfully added')
  }

  close(message: string=''): void {
    this.dialogRef.close(message)
  }
}
