import { Component } from '@angular/core';
import { BreukhService } from 'src/app/services/breukh/breukh.service';
import { SallePipe } from '../pipes/salle.pipe';
import { ClassePipe } from '../pipes/classe.pipe';
import { DatePipe } from '../pipes/date.pipe';

@Component({
  selector: 'app-prof',
  templateUrl: './prof.component.html',
  styleUrls: ['./prof.component.css'],
  providers: [SallePipe, ClassePipe, DatePipe]
})
export class ProfComponent {

  selectedSalle: string = ''
  selectedClasse: string = ''
  selectedModule: string = ''
  selectedDate: string = ''

  profs: any;
  display: string = 'prof'
  profName: string = ''
  cours: any
  allSessions: any[] = [];
  salle: any
  classes: any
  modules: any
  idProf!: number
  time_restant: any
  time: any
  jems: boolean = false
  month: any


  constructor(private breukh: BreukhService){}

  ngOnInit(){
    this.breukh.getProfs().subscribe((res:any)=>{
      this.profs = res;
      // console.log(this.profs);
    });
    this.breukh.getResources().subscribe((res: any) => {
      this.salle = res.salles
      // console.log(this.salles);
    })
    this.breukh.getResources().subscribe((res: any) => {
      this.classes = res.classes;
      //console.log(this.classes);
    })
    this.breukh.mod().subscribe((res:any) => {
      this.modules = res
    })
  }

  coursProf(prof: any){
    this.display = 'cours'
    this.profName = prof.name
    this.idProf = prof.id
    this.cours = prof.cour
    // console.log(this.cours);
    this.cours.forEach((element:any) => {
      // console.log(element.session);
      if (element.session.length > 0) {
        element.session.forEach((elt:any) => {
          this.allSessions.push(elt);
        });
      }
    });
    // console.log(this.allSessions);
  }

  separer(chaine: any) {
    const elements = chaine.split(" ");
    return elements[0];
  }

  convertirEnHeures(secondes: number): string {
    const heures = Math.floor(secondes / 3600);
    const minutes = Math.floor((secondes % 3600) / 60);
    if (minutes == 0) {
      return `${heures}h`;
    }
    return `${heures}h ${minutes}min`;
  }

  recup()
  {
    // console.log(this.selectedModule, this.idProf);
    if (this.selectedModule != 'un') {
      this.breukh.time(this.selectedModule, this.idProf).subscribe((res: any) => {
        // console.log(res);
        if (res != null) {
          this.jems = true
          this.time = res.time;
          this.time_restant = res.time_restant
        } else {
          this.jems = false
        }

      })
    }else{
      this.jems = false
    }
   
  }

  allProfs()
  {
    this.display = 'prof'
    this.allSessions = []
  }


}

