import { Component } from '@angular/core';

@Component({
  selector: 'app-transport-form',
  templateUrl: './transport-form.component.html',
  styleUrls: ['./transport-form.component.scss']
})
export class TransportFormComponent {

  transportTypes: string[] = ['Airport Pick Up', 'Generic Pick Up']
  airportPickUpSpots: string[] = ['OR Tambo Airport', 'Lanseria Airport']
  genericPickUpSpots: string[] = ['Afrika Tikkun', 'Neutrinos']
}
