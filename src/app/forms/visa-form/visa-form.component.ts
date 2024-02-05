import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SharedServiceService } from 'src/app/services/shared-service.service';

@Component({
  selector: 'app-visa-form',
  templateUrl: './visa-form.component.html',
  styleUrls: ['./visa-form.component.scss']
})
export class VisaFormComponent {
  visaRequestTypes: string[] = ['Application', 'Replacement', 'Extension']
  user: any;
  visaForm: any = {
    visaType: '',
    replacementReason: 'N/A',
    neededDate: '',
    status: 'Submitted'
  }
  visas: any;
  id: any = Number(`${new Date().getFullYear()}0001`)

  constructor(private sharedService: SharedServiceService, private dialogRef: MatDialogRef<VisaFormComponent>){
    this.user = this.sharedService.getData('session', 'user')
    this.visas = this.sharedService.getData('local', 'visas')
  }

  submit(form: NgForm): void {
    if(form.valid) {
      console.log(this.visaForm)
      this.visaForm['reqID'] = `visa-${this.id}`
      this.visas.push(this.visaForm)
      this.sharedService.storeData('local', 'visas', this.visas)
      this.id++
    }
    this.close('Visa request sucessfuly made')
  }

  close(message: string =''): void {
    this.dialogRef.close(message)
  }

}
