import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
    selector: 'app-responsable',
    templateUrl: './responsable.component.html',
    styleUrls: ['./responsable.component.css']
})
export class ResponsableComponent implements OnInit {

    ngOnInit(): void {
        initFlowbite();
    }

    calendarOptions: CalendarOptions = {
        initialView: 'dayGridMonth',
        plugins: [dayGridPlugin]
    };

    constructor(private router: Router) { }

}
