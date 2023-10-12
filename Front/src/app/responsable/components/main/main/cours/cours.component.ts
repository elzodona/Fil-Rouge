import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BreukhService } from 'src/app/services/breukh/breukh.service';


@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.css']
})
export class CoursComponent {

  photo: string = "assets/luffy.jpg"
  filieres: any;
  modules: any[] = [];
  profs: any[] = [];
  name: string = ""
  specialite: string = ""
  prof_id: number = 0;

  coursForm!: FormGroup


  constructor(private breukh: BreukhService, private fb: FormBuilder){
    this.coursForm = this.fb.group({
      semestre: ['un'],
      filiere: ['deux'],
      module: ['hop'],
      timing: [''],
    });

    this.coursForm.valueChanges.subscribe(res=>{
      const cours = JSON.stringify(res);      
      localStorage.setItem('cours', cours);
    })

    this.coursForm.get('filiere')?.valueChanges.subscribe(res=>{
      // console.log(res);
      this.breukh.getModule(res).subscribe((res: any) => {
        this.modules = res
        // console.log(this.modules);
      })
    })

    this.coursForm.get('module')?.valueChanges.subscribe(res=>{
      // console.log(res);
      this.breukh.getProf(res).subscribe((res: any) => {
        // console.log(res);
        this.profs = res

      });
    })


  }

  ngOnInit()
  {
    this.getData();
    this.recupMod();

    const c = localStorage.getItem('cours');
    if (c) {
      const co = JSON.parse(c);
      // console.log(co);
      this.coursForm.patchValue({
        semestre:co.semestre,
        filiere: co.filiere,
        module: co.module,
        timing: co.timing
      });
    }

  }

  getData()
  {
    this.breukh.getFiliere().subscribe(data =>{
      this.filieres = data
      // console.log(this.filieres);
    })
  }

  recupFil()
  {
    const fil_id = this.coursForm.get('filiere')?.value;
    this.breukh.getModule(fil_id).subscribe((res: any)=> {
      this.modules = res
      // console.log(this.modules);
    })
  }

  recupMod()
  {
    const mod_id = this.coursForm.get('module')?.value;
    // console.log(mod_id);
    this.breukh.getProf(mod_id).subscribe((res: any)=> {
      // console.log(res);
    this.profs = res

    });
  }

  toggleButtonState(prof: any) {
    prof.isAdding = !prof.isAdding;
    this.prof_id = prof.id;
    // console.log(this.prof_id);
  }

  addCours()
  {
    const data = this.coursForm.value
    data.prof = this.prof_id
    // console.log(data);
    this.breukh.addCour(data).subscribe((res:any)=>{
      console.log(res);
    })
    localStorage.removeItem('cours');
    this.coursForm.reset();
  }

}
