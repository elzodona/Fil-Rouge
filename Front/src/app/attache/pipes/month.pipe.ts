import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'month'
})
export class MonthPipe implements PipeTransform {

  transform(sessions: any[], selectedDate: string): any[] {
    if (selectedDate === '1') {
      const aujourdHui = new Date();
      const premierJourDuMois = new Date(aujourdHui.getFullYear(), aujourdHui.getMonth(), 1);
      const dernierJourDuMois = new Date(aujourdHui.getFullYear(), aujourdHui.getMonth() + 1, 0);

      return sessions.filter(session => {
        const dateSession = new Date(session.date_session);
        return dateSession >= premierJourDuMois && dateSession <= dernierJourDuMois;
      });
    }

    return sessions;
  }


}
