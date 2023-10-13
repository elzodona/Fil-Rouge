import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'module'
})
export class ModulePipe implements PipeTransform {

  transform(sessions: any[], mod: string): any[] {
    if (!mod || mod === 'un') {
      return sessions;
    }

    return sessions.filter(session => session.module == mod);
  }

}
