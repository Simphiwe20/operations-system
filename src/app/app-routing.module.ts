import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';
import { LandingComponent } from './components/landing/landing.component';
import { UsersComponent } from './components/users/users.component';
import { LeavesComponent } from './components/leaves/leaves.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PoliciesComponent } from './components/policies/policies.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {path: '', redirectTo: '/log-in', pathMatch: 'full'},
  {path: 'log-in', component: LogInComponent},
  {path: 'landing', component:LandingComponent, children: [
    {path: 'users', component: UsersComponent},
    {path: 'approved-leaves', component: LeavesComponent},
    {path: 'policies', component: PoliciesComponent},
    {path: 'dashboard', component:DashboardComponent}
  ]},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
