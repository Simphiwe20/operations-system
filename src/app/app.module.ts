import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { FormsModule } from '@angular/forms';
import { LandingComponent } from './components/landing/landing.component';
import { UsersComponent } from './components/users/users.component';
import { PoliciesComponent } from './components/policies/policies.component';
import { LeavesComponent } from './components/leaves/leaves.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GuesthouseComponent } from './components/guesthouse/guesthouse.component';
import { VisaComponent } from './components/visa/visa.component';
import { TransportComponent } from './components/transport/transport.component';
import { TravelsComponent } from './components/travels/travels.component';
import { LeaveFormComponent } from './forms/leave-form/leave-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    LandingComponent,
    UsersComponent,
    PoliciesComponent,
    LeavesComponent,
    PageNotFoundComponent,
    DashboardComponent,
    GuesthouseComponent,
    VisaComponent,
    TransportComponent,
    TravelsComponent,
    LeaveFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
