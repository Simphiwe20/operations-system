import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';
import { LandingComponent } from './components/landing/landing.component';
import { UsersComponent } from './components/users/users.component';
import { LeavesComponent } from './components/leaves/leaves.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PoliciesComponent } from './components/policies/policies.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GuesthouseComponent } from './components/guesthouse/guesthouse.component';
import { VisaComponent } from './components/visa/visa.component';
import { TransportComponent } from './components/transport/transport.component';
import { TravelsComponent } from './components/travels/travels.component';

const routes: Routes = [
  {path: '', redirectTo: '/log-in', pathMatch: 'full'},
  {path: 'log-in', component: LogInComponent},
  {path: 'landing', component:LandingComponent, children: [
    {path: 'users', component: UsersComponent},
    {path: 'approved-leaves', component: LeavesComponent},
    {path: 'policies', component: PoliciesComponent},
    {path: 'dashboard', component:DashboardComponent},
    {path: 'leaves', component: LeavesComponent},
    {path: 'guesthouse', component: GuesthouseComponent},
    {path: 'visa', component: VisaComponent},
    {path: 'transport', component: TransportComponent},
    {path: 'travels', component: TravelsComponent}
  ]},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
