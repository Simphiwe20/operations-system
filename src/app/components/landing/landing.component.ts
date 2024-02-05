import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  user: any;
  menuItems: any = []
  initials: any;
  clicked: number = 0;
  dashboardClicked: number = 1

  constructor(private router: Router) {
    this.user = sessionStorage.getItem('user')
    this.user = this.user ? JSON.parse(this.user) : []
    // this.dashboardClicked = 1
    this.firstRoute()
    console.log(this.user.firstName)
    this.initials = `${this.user.firstName.substring(0, 1)}${this.user.lastName.substring(0, 1)}`

    if(this.user.role === 'admin') {
      this.menuItems = [
        {menu: 'Users', route: 'users'},
        {menu: 'View Approved leaves', route: 'approved-leaves'},
        {menu: 'Policies', route: 'policies'}
      ]
    }else if(this.user.role === 'employee') {
      this.menuItems = [
        {menu: 'Leaves', route: 'leaves'},
        {menu: 'GuestHouse', route: 'guesthouse'},
        {menu: 'Visa', route: 'visa'},
        {menu: 'Transport', route: 'transport'},
        {menu: 'Travels', route: 'travels'}

      ]
    }else if(this.user.role === 'operations personnel') {
      this.menuItems = [
        {menu: 'GuestHouse', route: 'guesthouse'},
        {menu: 'Visa', route: 'visa'},
        {menu: 'Transport', route: 'transport'},
        {menu: 'Travels', route: 'travels'}
      ]
    }else {
      this.menuItems = [
        {menu: 'Action Leaves', route: 'leaves'},
        {menu: 'Action Travels Request', route: 'travels'},
        {menu: 'Leaves', route: 'leaves'},
        {menu: 'GuestHouse', route: 'guesthouse'},
        {menu: 'Visa', route: 'visa'},
        {menu: 'Transport', route: 'transport'},
        {menu: 'Travels', route: 'travels'}
      ]
    }
  }


  LogOut(): void {
    sessionStorage.clear()
    this.router.navigate(['/log-in'])
  }

  firstRoute(): void {
    this.router.navigate(['/landing/dashboard'])
  }
}
