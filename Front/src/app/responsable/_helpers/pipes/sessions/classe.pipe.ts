import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'classe'
})
export class ClassePipe implements PipeTransform {

  transform(sessions: any[], salleN: string): any[] {
    if (!salleN || salleN === 'un') {
      return sessions;
    }

    return sessions.filter(session => session.classes.some((c: any) => c.libelle === salleN));  }

}
