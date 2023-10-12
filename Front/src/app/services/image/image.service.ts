import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor() { }

  recupImg(img: File): Observable<string | null | ArrayBuffer> {
    return new Observable(obs => {
      const image = new FileReader();
      image.onload = () => obs.next(image.result)
      return image.readAsDataURL(img);
    })
  }
  
  
}
