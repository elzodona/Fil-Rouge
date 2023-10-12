import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login/login.component';
import { ProfesseurComponent } from './professeur.component';
import { SescourComponent } from './sescour/sescour.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', component: ProfesseurComponent },
    { path: 'sessions', component: SescourComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProfesseurRoutingModule { }
