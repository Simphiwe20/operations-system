import { Component } from '@angular/core';

@Component({
  selector: 'app-travels-form',
  templateUrl: './travels-form.component.html',
  styleUrls: ['./travels-form.component.scss']
})
export class TravelsFormComponent {
  travelTypes: string[] = ['International Travel', 'Domestic Travel']
}
