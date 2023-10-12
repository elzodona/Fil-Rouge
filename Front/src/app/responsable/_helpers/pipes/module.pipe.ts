import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'module'
})
export class ModulePipe implements PipeTransform {

  transform(value: string) {
    return 'Module : ' + value;
  }

}
