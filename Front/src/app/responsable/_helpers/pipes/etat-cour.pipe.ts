import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'etatCour'
})
export class EtatCourPipe implements PipeTransform {

  transform(cours: any[], etat: string): any[] {
    if (!etat || etat === 'deux') {
      return cours;
    }

    return cours.filter(cour => cour.etat === etat);
  }

}
