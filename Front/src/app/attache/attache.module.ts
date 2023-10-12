import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AttacheComponent } from './attache.component';
import { AttacheRoutingModule } from './attache-routing.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AttacheComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AttacheRoutingModule,
    RouterModule.forChild([])
  ]
})

export class AttacheModule { }
