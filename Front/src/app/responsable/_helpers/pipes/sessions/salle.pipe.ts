import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'salle'
})
export class SallePipe implements PipeTransform {

  transform(sessions: any[], salleN: string): any[] {
    if (!salleN || salleN === 'un') {
      return sessions;
    }

    return sessions.filter(session => session.salle.nom == salleN);
  }

}
