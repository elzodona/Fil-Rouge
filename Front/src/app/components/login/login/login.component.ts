import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm!: FormGroup;

  ngOnInit() {

  }

  constructor(private fb: FormBuilder, private toastr: ToastrService, private auth: AuthService, private router: Router) {
    this.loginForm = fb.group({
      email: ['ndaoelhadji973@gmail.com'],
      password: ['elzondao']
    })
  }

  login() {
    const data = this.loginForm.value;
    // console.log(data);
    this.auth.login(data).subscribe(res => {
      // console.log(res);
      if (res.status) {
        if (res.user.role == 'respo') {
          this.router.navigateByUrl('/responsable');
        }else if (res.user.role == 'prof') {
          this.router.navigateByUrl('/professeur');
        }else if(res.user.role == 'attach'){
          this.router.navigateByUrl('/attache');
        }else{
          console.log('no');
          this.router.navigateByUrl('/login');
        }
        this.toastr.success('Bienvenue '+ res.user.name);

        this.auth.setAccessToken(res.token);
        const userString = JSON.stringify(res.user);
        localStorage.setItem('user', userString);
        
      } else {
        this.toastr.error(res.message);
        this.router.navigateByUrl('/login');
      }
    })
  }


}
