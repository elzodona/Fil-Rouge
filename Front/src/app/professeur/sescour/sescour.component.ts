import { Component, ElementRef } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { isSameMonth } from 'date-fns';
import { isSameDay } from 'date-fns/fp';
import { BreukhService } from 'src/app/services/breukh/breukh.service';


@Component({
  selector: 'app-sescour',
  templateUrl: './sescour.component.html',
  styleUrls: ['./sescour.component.css']
})
export class SescourComponent {

  sessions: any
  calendarEvents: any[] = [];
  sessionDetails: any
  idSession!: number;
  motif: string = '';

  viewDate:Date = new Date();
  view: CalendarView = CalendarView.Week
  CalendarView!: CalendarView
  wich: string = 'week';

  activeDayIsOpen: boolean = false;

  constructor(private breukh: BreukhService, private elRef: ElementRef){}

  ngOnInit() {
    const cour =localStorage.getItem('cour');
    if (cour) {
      const id = JSON.parse(cour)
      // console.log(id);
      
      this.breukh.sessCour(id.id).subscribe((res: any) => {
        this.sessions = res.data;
        // console.log(this.sessions);
        this.calendarEvents = this.formatSessionsForCalendar(this.sessions);
        console.log(this.sessions);
  
      });
    }
  }

  setView(view: string)
  {
    this.wich = view;
  }

  dayClicked({ date }: { date: Date }) {
    if (isSameMonth(date, this.viewDate)) {
      if (isSameDay(this.viewDate, date) && this.activeDayIsOpen) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  
  formatSessionsForCalendar(sessions: any[]): any[] {
    return sessions.map(session => {
      const startTime = new Date(session.date_session);
      const endTime = new Date(session.date_session);
      startTime.setSeconds(session.started_at);
      endTime.setSeconds(session.finished_at);

      return {
        id: session.id,
        title: `${session.module}`,
        start: startTime,
        end: endTime,
        extendedProps: {
          salle: session.salle?.nom || 'En ligne',
          etat: session.etat
        }
      };
    });
  }


  convertToTime(time: string): string {
    const hours = Math.floor(parseInt(time) / 3600);
    const minutes = Math.floor((parseInt(time) % 3600) / 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }

  eventClicked(event: any) {
    const modal = document.getElementById('sessionModal');
    if (modal) {
      modal.style.display = 'block';
    }
    //console.log(event.event);
    const id = event.event.id;
    // console.log(this.sessions);
    
    this.sessionDetails = this.sessions.find((session:any) => session.id == id);
    // console.log(this.sessionDetails);
  }

  closeModal() {
    const modal = document.getElementById('sessionModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  annuler(session: any)
  {
    // console.log(session);
    this.idSession = session.id
    const modal = document.getElementById('annulationModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  close() {
    const modal = document.getElementById('annulationModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  annulerSession() {
    this.close();
    // console.log(this.idSession, this.motif);
    this.breukh.canceled(this.idSession, this.motif).subscribe((res:any)=>{
      console.log(res.message);
    });
  }




}
