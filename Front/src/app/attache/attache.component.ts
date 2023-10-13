import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { BreukhService } from '../services/breukh/breukh.service';
import { dE } from '@fullcalendar/core/internal-common';

@Component({
    selector: 'app-attache',
    templateUrl: './attache.component.html',
})
export class AttacheComponent implements OnInit {

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
    demandes: any
    motif!: string
    sessionId: number = 0
    affiche: boolean = false


    calendarOptions: CalendarOptions = {
        initialView: 'dayGridMonth',
        plugins: [dayGridPlugin]
    };

    constructor(private router: Router, private breukh: BreukhService) {
        const userTo = localStorage.getItem('user');
        if (userTo) {
            const user = JSON.parse(userTo);
            this.id = user.id;
            this.name = user.name
            this.img = 'http://localhost:8000/storage/' + user.photo
            if (user.role == 'attach') {
                this.role = 'attaché';
            }
        }

    }

    ngOnInit(): void {
        initFlowbite();
        this.breukh.getNotif().subscribe((res:any)=>{
            this.demandes = res.data
        })
    }

    deconnecter() {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.router.navigateByUrl('/login');
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

    response(demand: any)
    {
        // console.log(demand);
        this.motif = demand.motif
        this.sessionId = demand.id
        const modal = document.getElementById('modal');
        if (modal) {
            modal.style.display = 'block';
        }
    }

    accepter()
    {
        const modal = document.getElementById('modal');
        if (modal) {
            modal.style.display = 'none';
        }
        this.breukh.response(this.sessionId, 'yes').subscribe((res:any)=>{
            console.log(res.message);
            this.breukh.getNotif().subscribe((res: any) => {
                this.demandes = res.data
            })
        })
    }

    refuser()
    {
        const modal = document.getElementById('modal');
        if (modal) {
            modal.style.display = 'none';
        }
        this.breukh.response(this.sessionId, 'no').subscribe((res:any)=>{
            console.log(res.message);
            this.breukh.getNotif().subscribe((res: any) => {
                this.demandes = res.data
            })
        })
    }

    closeModal()
    {
        const modal = document.getElementById('modal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    home()
    {
        this.affiche = true
    }

    prof()
    {
        this.affiche = false
    }
}