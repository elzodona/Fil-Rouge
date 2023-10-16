import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfesseurComponent } from './professeur.component';
import { RouterModule } from '@angular/router';
import { ProfesseurRoutingModule } from './professeur-routing.module';
import { SescourComponent } from './sescour/sescour.component';

import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    ProfesseurComponent,
    SescourComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    ProfesseurRoutingModule,
    RouterModule.forChild([]),
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })
    
  ]
})
export class ProfesseurModule { }
