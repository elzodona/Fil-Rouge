import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AttacheComponent } from './attache.component';
import { AttacheRoutingModule } from './attache-routing.module';
import { RouterModule } from '@angular/router';
import { ProfComponent } from './prof/prof.component';
import { SallePipe } from './pipes/salle.pipe';
import { ClassePipe } from './pipes/classe.pipe';
import { DatePipe } from './pipes/date.pipe';
import { ModulePipe } from './pipes/module.pipe';
import { MonthPipe } from './pipes/month.pipe';

import { ToastrModule } from 'ngx-toastr';
import { SesdoneComponent } from './prof/sesdone/sesdone.component';


@NgModule({
  declarations: [
    AttacheComponent,
    ProfComponent,
    SallePipe,
    ClassePipe,
    DatePipe,
    ModulePipe,
    MonthPipe,
    SesdoneComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule,
    AttacheRoutingModule,
    RouterModule.forChild([])
  ]
})

export class AttacheModule { }
