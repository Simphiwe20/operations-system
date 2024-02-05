import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SharedServiceService } from 'src/app/services/shared-service.service';

@Component({
  selector: 'app-travels-form',
  templateUrl: './travels-form.component.html',
  styleUrls: ['./travels-form.component.scss']
})
export class TravelsFormComponent {
  travelTypes: string[] = ['International Travel', 'Domestic Travel']

  travelForm: any = {
    departureDate: '',
    returnDate: '',
    travelType: '',
    reasonForTravel: '',
    specialNeeds: '',
    status: 'Submitted'
  }
  user: any;
  travelData: any;
  id: any = Number(`${new Date().getFullYear()}0001`)

  constructor(private sharedService: SharedServiceService, private dialogRef: MatDialogRef<TravelsFormComponent>) {
    this.travelData = this.sharedService.getData('local', 'travels')
    this.user = this.sharedService.getData('session', 'user')
  }

  submit(form: NgForm): void {
    if(form.valid) {
      if(this.travelForm['specialNeeds'] === '') {
        this.travelForm['specialNeeds'] = 'None'
      }
      this.travelForm['reqID'] = `travel-${this.id}`
      this.travelForm['requestedBy'] = `${this.user.firstName} ${this.user.lastName}`
      this.travelForm['requestedByEmail'] = this.user.email
      this.id++
      console.log(this.travelForm)
      this.travelData.push(this.travelForm)
      this.sharedService.storeData('local', 'travels', this.travelData)
    }
    this.close('Visa request added successfuly')
  }

  close(message: string =''): void {
    this.dialogRef.close(message)
  }

}
