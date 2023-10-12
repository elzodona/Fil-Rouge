import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  transform(sessions: any[], selectedDate: string): any[] {
    if (!selectedDate || selectedDate === 'un') {
      return sessions;
    }

    return sessions.sort((a, b) => {
      const dateA = new Date(a.date_session).getTime();
      const dateB = new Date(b.date_session).getTime();

      if (selectedDate === '1') {
        return dateB - dateA;
      } else if (selectedDate === '2') {
        return dateA - dateB;
      }

      return 0;
    });
  }

}
