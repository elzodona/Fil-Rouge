import { Component } from '@angular/core';
import { BreukhService } from 'src/app/services/breukh/breukh.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-sesdone',
  templateUrl: './sesdone.component.html',
  styleUrls: ['./sesdone.component.css']
})
export class SesdoneComponent {

  toValidate: any[] = [];
  absents: any


  constructor(private breukh: BreukhService, private toastr: ToastrService){}

  ngOnInit()
  {
    this.breukh.toValidate().subscribe((res: any) => {
      this.toValidate = res;
      // console.log(res);
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

  separer(chaine: any) {
    const elements = chaine.split(" ");
    return elements[0];
  }

  valider(session: any)
  {
    // console.log(session.id);
    this.breukh.valider(session.id).subscribe((res: any) => {
      this.toastr.success(res.message);
      this.breukh.toValidate().subscribe((res: any) => {
        this.toValidate = res;
      })
    })
  }

  invalider(session: any)
  {
    // console.log(session.id);
    this.breukh.invalider(session.id).subscribe((res: any) => {
      this.toastr.success(res.message);
      this.breukh.toValidate().subscribe((res: any) => {
        this.toValidate = res;
      })
    })
  }

  details(det: any)
  {
    console.log(det);
    this.absents = det
    const modal = document.getElementById('modal');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  closeModal() {
    const modal = document.getElementById('modal');
    if (modal) {
      modal.style.display = 'none';
    }
  }

}
