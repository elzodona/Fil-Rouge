import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ProfesseurComponent } from './professeur.component';
import { RouterModule } from '@angular/router';
import { ProfesseurRoutingModule } from './professeur-routing.module';
import { SescourComponent } from './sescour/sescour.component';

@NgModule({
  declarations: [
    ProfesseurComponent,
    SescourComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule,
    ProfesseurRoutingModule,
    RouterModule.forChild([]),
  ]
})
export class ProfesseurModule { }
