import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login/login.component';
import { ResponsableModule } from './responsable/responsable.module';
import { RegisterComponent } from './components/register/register.component';
import { authguardGuard } from './_helpers/AuthGuard/authguard.guard';
import { authguard2Guard } from './_helpers/AuthGuard2/authguard2.guard';
import { ProfesseurModule } from './professeur/professeur.module';
import { authUserGuard } from './_helpers/AuthUser/auth-user.guard';
import { respoGuard } from './_helpers/AuthUser/respo.guard';
import { AttacheModule } from './attache/attache.module';


const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent, canActivate: [authguard2Guard] },
  { path: 'register', component: RegisterComponent, canActivate: [authguard2Guard] },
  { path: 'responsable', loadChildren: () => ResponsableModule, canActivate: [authguardGuard, respoGuard] },
  { path: 'professeur', loadChildren: () => ProfesseurModule, canActivate: [authguardGuard, authUserGuard] },
  { path: 'attache', loadChildren: () => AttacheModule }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
