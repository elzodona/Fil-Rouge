import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';

import { RouterModule } from '@angular/router';

import { ResponsableComponent } from './responsable.component';
import { ResponsableRoutingModule } from './responsable-routing.module';

import { MainComponent } from './components/main/main/main.component';
import { CoursComponent } from './components/main/main/cours/cours.component';
import { SessionComponent } from './components/main/main/session/session.component';
import { HomeComponent } from './components/main/main/home/home.component';
import { EleveComponent } from './components/main/main/eleve/eleve.component';
import { ListeSessionComponent } from './components/main/main/home/liste-session/liste-session.component';
import { ModulePipe } from './_helpers/pipes/module.pipe';
import { ProfesseurPipe } from './_helpers/pipes/professeur.pipe';
import { EtatCourPipe } from './_helpers/pipes/etat-cour.pipe';
import { SallePipe } from './_helpers/pipes/sessions/salle.pipe';
import { ClassePipe } from './_helpers/pipes/sessions/classe.pipe';
import { DureePipe } from './_helpers/pipes/sessions/duree.pipe';
import { DatePipe } from './_helpers/pipes/sessions/date.pipe';

import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    ResponsableComponent,
    EleveComponent,
    MainComponent,
    CoursComponent,
    SessionComponent,
    HomeComponent,
    ListeSessionComponent,
    ModulePipe,
    ProfesseurPipe,
    EtatCourPipe,
    SallePipe,
    ClassePipe,
    DureePipe,
    DatePipe
  ],
  imports: [
    CommonModule,
    ResponsableRoutingModule,
    RouterModule.forChild([]),
    ReactiveFormsModule,
    FormsModule,
    FullCalendarModule,
    ToastrModule
  ]
})
export class ResponsableModule { }
