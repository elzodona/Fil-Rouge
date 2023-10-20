import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

  child: string = 'home';
  name: string = ''
  role: string = ''
  img: string = ''

  constructor(private router: Router, private toastr: ToastrService){
    const userTo = localStorage.getItem('user');
    if (userTo) {
      const user = JSON.parse(userTo);
      this.name = user.name
      this.img = 'http://localhost:8000/storage/' + user.photo
      if (user.role == 'respo') {
        this.role = 'responsable pédagogique';
      }
    }
  }

  deconnecter()
  {
    this.toastr.success('Bye Bye petit papillon !!');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('cours');
    localStorage.removeItem('idSession');
    localStorage.removeItem('module');
    localStorage.removeItem('prof');
    this.router.navigateByUrl('/login');
  }

  showChild1() {
    this.child = 'cours';
    // console.log(this.child)
  }

  showChild2() {
    this.child = 'session';
    // console.log(this.child)
  }

  showChild3() {
    this.child = 'home';
    // console.log(this.child)
  }

  showChild4() {
    this.child = 'eleve';
    // console.log(this.child)
  }

}
