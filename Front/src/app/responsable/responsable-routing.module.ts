import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main/main.component';
import { CoursComponent } from './components/main/main/cours/cours.component';
import { SessionComponent } from './components/main/main/session/session.component';
import { HomeComponent } from './components/main/main/home/home.component';
import { LoginComponent } from '../components/login/login/login.component';
import { guard1Guard } from './_helpers/canActivatedFn/guard1.guard';

const routes: Routes = [
    { path: 'login', component: LoginComponent, canActivate: [guard1Guard] },
    { path: '', component: MainComponent },
    // { path: 'home', component: HomeComponent },
    // { path: 'cours', component: CoursComponent },
    // { path: 'session', component: SessionComponent },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ResponsableRoutingModule { }
