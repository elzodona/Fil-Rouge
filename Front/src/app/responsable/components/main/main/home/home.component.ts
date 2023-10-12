import { Component } from '@angular/core';
import { BreukhService } from 'src/app/services/breukh/breukh.service';
import { ProfesseurPipe } from 'src/app/responsable/_helpers/pipes/professeur.pipe';
import { EtatCourPipe } from 'src/app/responsable/_helpers/pipes/etat-cour.pipe';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ProfesseurPipe, EtatCourPipe]

})
export class HomeComponent {

  cours: any[] = [];
  display: boolean = true;
  module: string = '';
  prof: string = '';
  selectedEtat: string = 'deux';

  constructor(private breukh: BreukhService){
    const mod = localStorage.getItem('module')
    if (mod) {
      this.module = JSON.parse(mod)
    }

    const pro = localStorage.getItem('prof')
    if (pro) {
      this.prof = JSON.parse(pro)
    }
  }

  ngOnInit()
  {
    this.getModule()
  }

  getModule()
  {
    this.breukh.getResources().subscribe((res:any)=>{
      this.cours = res.cours
      // console.log(this.cours);
      
    })
  }

  convertirEnHeures(secondes: number): string {
    const heures = Math.floor(secondes / 3600);
    const minutes = Math.floor((secondes % 3600) / 60);
    if (minutes == 0) {
      return `${heures}h`;
    }
    return `${heures}h ${minutes}min`;
  }

  allCours()
  {
    this.display = true;
  }

  sessionByCour(cour: any)
  {
    // console.log(id);
    localStorage.setItem('idSession', JSON.stringify(cour.id));
    this.prof = cour.prof_id.name;
    this.module = cour.module_id.libelle;
    localStorage.setItem('prof', JSON.stringify(this.prof));
    localStorage.setItem('module', JSON.stringify(this.module));
    this.display = false;
  }




}
