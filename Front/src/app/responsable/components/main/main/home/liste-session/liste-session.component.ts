import { Component } from '@angular/core';
import { BreukhService } from 'src/app/services/breukh/breukh.service';
import { SallePipe } from 'src/app/responsable/_helpers/pipes/sessions/salle.pipe';
import { ClassePipe } from 'src/app/responsable/_helpers/pipes/sessions/classe.pipe';
import { DureePipe } from 'src/app/responsable/_helpers/pipes/sessions/duree.pipe';
import { DatePipe } from 'src/app/responsable/_helpers/pipes/sessions/date.pipe';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-liste-session',
  templateUrl: './liste-session.component.html',
  styleUrls: ['./liste-session.component.css'],
  providers: [SallePipe, ClassePipe, DureePipe, DatePipe]
})

export class ListeSessionComponent {

  sessions: any[] = [];
  module: string = ''
  prof: string = ''
  selectedSalle: string = ''
  salle: any
  selectedClasse: string = ''
  classes: any
  selectedDuree: string = ''
  selectedDate: string = ''
  idClasses: any[] = [];
  eleves: any


  ngOnInit()
  {
    this.session()
    this.salles()
  }

  constructor(private breukh: BreukhService, private toastr: ToastrService){}

  session()
  {
    const ses = localStorage.getItem('idSession');
    if (ses) {
      const session = JSON.parse(ses)
      // console.log(session);
      this.breukh.sessCour(session).subscribe((res:any)=>{
        this.sessions = res.data
        // console.log(this.sessions);

      });
    }
  }

  convertirEnHeures(secondes: number): string {
    const heures = Math.floor(secondes / 3600);
    const minutes = Math.floor((secondes % 3600) / 60);
    if (minutes == 0) {
      return `${heures}h`;
    }
    return `${heures}h ${minutes}min`;
  }

  separer(chaine: any) {
    const elements = chaine.split(" ");
    return elements[0];
  }

  salles()
  {
    this.breukh.getResources().subscribe((res:any)=>{
      this.salle = res.salles
      // console.log(this.salles);
    })
    this.breukh.getResources().subscribe((res:any)=>{
      this.classes = res.classes;
      //console.log(this.classes);
    })
  }

  deleteSession(session: any)
  {
    // console.log(session.id);
    this.breukh.delete(session.id).subscribe((res:any)=>{
      // console.log(res.message);
      this.toastr.success('la session est annulée !!');
      this.session()
    });
  }

  viewEleve(session: any)
  {
    const modal = document.getElementById('modal');
    if (modal) {
      modal.style.display = 'block';
    }
    //console.log(session.classes);
    session.classes.forEach((element:any) => {
      this.idClasses.push(element.id)
    });
    // console.log(this.idClasses);
    this.breukh.eleves(this.idClasses).subscribe((res:any)=>{
      // console.log(res);
      this.eleves = res;
    })
    this.idClasses = []
  }

  closeModal()
  {
    const modal = document.getElementById('modal');
    if (modal) {
      modal.style.display = 'none';
    }
  }


}
