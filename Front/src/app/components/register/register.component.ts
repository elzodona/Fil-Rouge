import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ImageService } from 'src/app/services/image/image.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm!: FormGroup;
  
  name: string = ''
  img: string = ''

  constructor(private imageService: ImageService, private fb: FormBuilder, private auth: AuthService){
    this.registerForm = this.fb.group({
      name: [''],
      email: [''],
      password: [''],
      role: ['hop'],
      specialite: ['hum'],
    });
  }

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const selectedImage = inputElement.files?.[0] as File;
    this.name = selectedImage.name

    if (selectedImage) {
      this.imageService.recupImg(selectedImage).subscribe({
        next: (arg) => {
          this.img = arg as string;
        }
      });
    }
    console.log(this.name);
    console.log(this.img);
  }

  register()
  {
    const data = this.registerForm.value
    data.photo = this.img
    data.photo_name = this.name
    // console.log(data);
    this.auth.register(data).subscribe(res => {
      console.log(res);
    })
    this.registerForm.reset()
  }

}
