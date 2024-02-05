import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SharedServiceService } from 'src/app/services/shared-service.service';

@Component({
  selector: 'app-transport-form',
  templateUrl: './transport-form.component.html',
  styleUrls: ['./transport-form.component.scss']
})
export class TransportFormComponent {

  transportTypes: string[] = ['Airport Pick Up', 'Generic Pick Up']
  airportPickUpSpots: string[] = ['OR Tambo Airport', 'Lanseria Airport']
  genericPickUpSpots: string[] = ['Afrika Tikkun', 'Neutrinos']
  dropOffSpots: string[] = ['Afrika Tikkun', 'Afrika Tikkun', 'OR Tambo Airport', 'Lanseria Airport', 'Other']
  transportForm: any = {
    transportType: '',
    neededDate: '',
    pickUpSpot: '',
    pickUpReason: '',
    dropOffSpot: '',
    status: 'submitted' 

  }
  transportData: any;
  id: any = Number(`${new Date().getFullYear()}0001`)

  constructor(private sharedService: SharedServiceService, private dialogRef: MatDialogRef<TransportFormComponent>) {
    this.transportData = this.sharedService.getData('local', 'transport')
  }

  submit(form: NgForm): void {
    if(form.valid) {
      console.log(this.transportForm)
      this.transportForm['reqID'] = this.id
      this.transportData.push(this.transportForm)
      this.sharedService.storeData('local', 'transport', this.transportData)
      this.id++
    }

    this.close('Transport request added successfuly')
  }

  close(message: string='') {
    this.dialogRef.close(message)
  }
}