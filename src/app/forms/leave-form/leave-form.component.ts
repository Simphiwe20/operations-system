import { Component } from '@angular/core';

@Component({
  selector: 'app-leave-form',
  templateUrl: './leave-form.component.html',
  styleUrls: ['./leave-form.component.scss']
})
export class LeaveFormComponent {
  leaveTypes: string[] = ['Annual Leave', 'Sick Leave', 'Family Responsibility Leave']
}
