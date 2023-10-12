import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duree'
})
export class DureePipe implements PipeTransform {

  transform(sessions: any[], selectedDuree: string): any[] {
    if (!selectedDuree || selectedDuree === 'un') {
      return sessions;
    }

    return sessions.sort((a, b) => {
      if (a.duration && b.duration) {
        if (selectedDuree === '1') {
          return a.duration - b.duration;
        } else if (selectedDuree === '2') {
          return b.duration - a.duration;
        }
      }
      return 0;
    });
    
  }

}
