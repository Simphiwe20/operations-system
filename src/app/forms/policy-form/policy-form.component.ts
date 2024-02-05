import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedServiceService } from 'src/app/services/shared-service.service';

@Component({
  selector: 'app-policy-form',
  templateUrl: './policy-form.component.html',
  styleUrls: ['./policy-form.component.scss']
})
export class PolicyFormComponent {

  policyForm: any = {
    policyName: '',
    category: '',
    overview: '',
    purpose: '',
    objective: '',
    guidlines: ''
  }
  policyData: any;

  constructor(private sharedService: SharedServiceService, private dialogRef: MatDialogRef<PolicyFormComponent>,
    private snackBar: MatSnackBar) {

      this.policyData = this.sharedService.getData('local', 'policies')
  }

  submit(form: NgForm): void {
    if (form.valid) {
      console.log(this.policyForm)
      this.policyData.push(this.policyForm) 
      this.sharedService.storeData('local', 'policies', this.policyData)
      this.close('Policy Added successfully')
    }
  }

  close(message: string = '') {
    this.dialogRef.close(message)
  }
}
