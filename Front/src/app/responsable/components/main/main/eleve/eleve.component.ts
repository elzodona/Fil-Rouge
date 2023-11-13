import { Component } from '@angular/core';
import { BreukhService } from 'src/app/services/breukh/breukh.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-eleve',
  templateUrl: './eleve.component.html',
  styleUrls: ['./eleve.component.css']
})
export class EleveComponent {

  classes: any
  name: any;
  file: any
  id: any;
  formData = new FormData();
  fileSelected = false;
  eleve: any



  constructor(private breukh: BreukhService, private toastr: ToastrService){}

  ngOnInit()
  {
    this.addStudent();
  }

  addStudent()
  {
    this.breukh.getResources().subscribe((res:any)=>{
      this.classes = res.classes
      // console.log(this.classes);
    })
  }

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const selectedFile = inputElement.files?.[0] as File;

    if (selectedFile) {
      this.formData.append('file', selectedFile);
      this.formData.append('classe_id', this.id);
      this.formData.append('annee_id', '1');
      this.fileSelected = true;
    }
  }

  save() {
    console.log(this.formData);

    if (this.fileSelected) {
      this.breukh.addEtudiant(this.formData).subscribe((res:any) => {
        // console.log(res);
        this.toastr.success(res.message);
        this.addStudent();
      })
    }
    const modal = document.getElementById('modal')
    if (modal) {
      modal.style.display = 'none';
    }
  }

  eleves(id: number)
  {
    this.eleve = [];
    console.log(id);
    this.breukh.eles(id).subscribe(res=>{
      this.eleve = res;
    })
    const modal = document.getElementById('modalb')
    if (modal) {
      modal.style.display = 'block';
    }
  }

  inscrire(id: number) {
    // console.log(id);
    this.id = id;
    const modal = document.getElementById('modal')
    if (modal) {
      modal.style.display = 'block';
    }
  }

  closeModa() {
    const modal = document.getElementById('modalb')
    if (modal) {
      modal.style.display = 'none';
    }
  }

  closeModal()
  {
    const modal = document.getElementById('modal')
    if (modal) {
      modal.style.display = 'none';
    }
  }


}
