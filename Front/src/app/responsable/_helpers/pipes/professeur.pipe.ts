import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'professeur'
})
export class ProfesseurPipe implements PipeTransform {

  transform(value: string) {
    return 'Professeur : ' + value;
  }

}
