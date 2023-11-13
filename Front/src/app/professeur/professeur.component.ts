import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { BreukhService } from '../services/breukh/breukh.service';
import { ToastrService } from 'ngx-toastr';


@Component({
    selector: 'app-professeur',
    templateUrl: './professeur.component.html',
})
export class ProfesseurComponent implements OnInit {

    name: string = ''
    role: string = ''
    img: string = ''
    id: number = 0
    cours: any[] = []
    count: number = 0
    times: number = 0
    display: boolean = true
    heures: any
    num: number = 0
    module!: string


    constructor(private toastr: ToastrService, private router: Router, private breukh: BreukhService) {
        const userTo = localStorage.getItem('user');
        if (userTo) {
            const user = JSON.parse(userTo);
            this.id = user.id;
            this.name = user.name
            this.img = 'http://localhost:8000/storage/' + user.photo
            if (user.role == 'prof') {
                this.role = 'professeur';
            }
        }
    }

    ngOnInit(): void {
        initFlowbite();
        localStorage.removeItem('cour')
        this.breukh.courProf(this.id).subscribe((res:any)=>{
            this.cours = res.data
            this.count = res.data.length
            // console.log(this.cours);
            this.cours.forEach(element => {
                this.times += element.time_restant
            });
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

    deconnecter() {
        this.toastr.success('See you soon!');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.router.navigateByUrl('/login');
    }

    sessions(cour : any)
    {
        this.display = false;
        // console.log(cour);
        this.module = cour.module_id.libelle
        this.heures = this.convertirEnHeures(cour.time_restant)
        this.num = cour.session.length;
        localStorage.setItem('cour', JSON.stringify(cour))
    }

    allCours()
    {
        this.display = true
        localStorage.removeItem('cour')
    }

}
