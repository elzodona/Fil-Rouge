import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { BreukhService } from 'src/app/services/breukh/breukh.service';
import { ToastrService } from 'ngx-toastr';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent {

  modules: any
  profs: any
  mod_id: number = 0
  prof_id: number = 0
  sm_id: number = 0
  coursChoisi: any
  classes: any
  rightClasses: any[] = []
  trueClasse: any
  classe: boolean = false
  effectif: number = 0
  isSalle: boolean = false
  salles: any
  newSalles: any
  selectedSalle: any;

  minDate!: string


  sessionForm! : FormGroup


  constructor(private breukh: BreukhService, private fb: FormBuilder, private toastr: ToastrService){

    this.sessionForm = this.fb.group({
      semestre: ['humm'],
      module: ['hum'],
      prof: ['hop'],
      date: ['', [this.validateDate.bind(this)]],
      start: ['', [this.validateStartTime.bind(this)]],
      end: ['', [this.validateEndTime.bind(this)]]
    });

    // this.sessionForm.valueChanges.subscribe(res=>{
    //   this.recupCours()
    // })

    this.sessionForm.valueChanges.subscribe(res=>{
      const session = JSON.stringify(res);
      localStorage.setItem('session', session);
    })

    this.sessionForm.get('semestre')?.valueChanges.subscribe(res=>{
      if (!isNaN(res)) {
        this.breukh.allModule(res).subscribe((res) => {
          this.modules = res
        })
      } else {
        this.modules = []
      }
    })

    this.sessionForm.get('module')?.valueChanges.subscribe(res=>{
      const sm_id = this.sessionForm.get('semestre')?.value;
      this.breukh.profSession(sm_id, res).subscribe((res: any) => {
        this.profs = res
      });
    })
  }

  ngOnInit()
  {
    this.minDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
    this.recupSm();
    // this.recupCours()
    // this.sessionForm.get('date')?.setValidators(this.validateDate.bind(this));
    // this.sessionForm.get('date')?.updateValueAndValidity();

    const s = localStorage.getItem('session');
    if (s) {
      const so = JSON.parse(s);
      // console.log(co);
      this.sessionForm.patchValue({
        semestre: so.semestre,
        module: so.module,
        prof: so.prof,
        date: so.date,
        start: so.start,
        end: so.end
      });
    }
  }

  validateDate(control: AbstractControl): ValidationErrors | null {
    const selectedDate = new Date(control.value);
    const dayOfWeek = selectedDate.getDay();
    if (dayOfWeek === 6 || dayOfWeek === 0) { // 6 pour samedi, 0 pour dimanche
      return { weekend: true };
    }
    return null;
  }

  validateStartTime(control: AbstractControl): ValidationErrors | null {
    const startTime = control.value;
    if (startTime) {
      const hours = parseInt(startTime.split(':')[0], 10);
      if (hours < 8 || hours >= 16) {
        return { invalidStartTime: true };
      }
    }
    return null;
  }

  validateEndTime(control: AbstractControl): ValidationErrors | null {
    const startTime = control.value;
    if (startTime) {
      const hours = parseInt(startTime.split(':')[0], 10);
      if (hours < 9 || hours >= 17) {
        return { invalidEndTime: true };
      }
    }
    return null;
  }

  recupMod() {
    const mod_id = this.sessionForm.get('module')?.value;
    const sm_id = this.sessionForm.get('semestre')?.value;
    // console.log(mod_id);
    this.breukh.profSession(sm_id, mod_id).subscribe((res: any) => {
      // console.log(res);
      this.profs = res
    });
  }

  recupSm()
  {
    const sm = this.sessionForm.get('semestre')?.value;
    // console.log(sm);
    if (!isNaN(sm)) {
      this.breukh.allModule(sm).subscribe((res) => {
        this.modules = res
      })
    }else{
      this.modules = []
    }

  }

  recupCours()
  {
    this.sm_id = this.sessionForm.get('semestre')?.value
    this.mod_id = this.sessionForm.get('module')?.value
    this.prof_id = this.sessionForm.get('prof')?.value

    if (!isNaN(this.prof_id)) {
      // console.log(this.mod_id, this.prof_id);
      this.breukh.existingCours(this.sm_id, this.mod_id, this.prof_id).subscribe(res=>{
        this.coursChoisi = res
        // console.log(this.coursChoisi);
        if (res) {
          this.breukh.getResources().subscribe((res:any) => {
            // console.log(res.classes);
            this.classes = res.classes
            this.classes.forEach((element: any) => {
              // console.log(element.filiere.id);
              const fil_id = element.filiere.id
              if (!isNaN(fil_id) && !isNaN(this.mod_id)) {
                this.breukh.filMod(fil_id, this.mod_id).subscribe(res => {
                  // console.log(res);
                  if (res) {
                    this.classe = true;
                    // console.log(element);
                    this.rightClasses.push(element);
                  }
                })
              }
            });
            // console.log(this.rightClasses);
          })
        }

      })

    }else{

    }
  }

  getSelectedClasses(selectedClass: any) {
    selectedClass.isSelected = !selectedClass.isSelected;

    this.effectif = 0;

    const selectedClasses = this.rightClasses.filter(selectedClass => {
      return selectedClass.isSelected;
    });

    const selectedIds = selectedClasses.map(selectedClass => {
      return { 'id': selectedClass.id, 'effectif': selectedClass.effectif };
    });

    selectedIds.forEach(element => {
      this.effectif += +element.effectif;
    });

    this.breukh.getResources().subscribe((res:any)=>{
      this.salles = res.salles;
      this.newSalles = this.salles.filter((element:any) => element.places >= this.effectif)

      if (this.newSalles.length == 0) {
        this.isSalle = true
      }else{
        this.isSalle = false
      }

    })
  }

  // getSelectedSalles(selectedSalle: any) {
  //   this.newSalles.forEach((salle:any) => {
  //     return salle.isSelected = (salle === selectedSalle)? true : false;
  //   });
  // }


  selectSalle(salle: any) {
    this.selectedSalle = salle;
  }

  addSession()
  {
    // console.log(this.selectedSalle);
    const hey = this.rightClasses.filter((salle:any) => salle.isSelected);
    this.trueClasse = hey.map((salle:any) => salle.id)

    const data = this.sessionForm.value
    data.classes = this.trueClasse
    if (this.selectedSalle) {
      data.salle = this.selectedSalle.id
    }

    this.breukh.addSes(data).subscribe((res:any)=>{
      console.log(res);
      this.toastr.success(res.message);
    })
    localStorage.removeItem('session')
    // this.sessionForm.reset()
  }


}

