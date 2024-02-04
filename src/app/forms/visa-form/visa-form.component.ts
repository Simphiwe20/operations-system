import { Component } from '@angular/core';

@Component({
  selector: 'app-visa-form',
  templateUrl: './visa-form.component.html',
  styleUrls: ['./visa-form.component.scss']
})
export class VisaFormComponent {
  visaRequestTypes: string[] = ['Application', 'Replacement', 'Extension']
}
