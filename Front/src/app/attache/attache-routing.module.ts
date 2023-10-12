import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login/login.component';
import { AttacheComponent } from './attache.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', component: AttacheComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AttacheRoutingModule { }
