import { Component } from '@angular/core';
import { ImageInterface } from '../../interfaces/image-interface';

@Component({
  selector: 'app-carrousel-component',
  imports: [],
  templateUrl: './carrousel-component.html',
  styleUrl: './carrousel-component.css',
})
export class CarrouselComponent {

  arrayImagenes: ImageInterface[];
  imagenActual: number;

  constructor(){
    this.imagenActual = 0;
    this.arrayImagenes = [{
      url: 'https://placehold.co/600x400/orange/white',
      title: 'Naranja',
      alt: 'Placeholder color naranja',
    },
    {
      url: 'https://placehold.co/600x400/blue/white',
      title: 'Azul',
      alt: 'Placeholder color azul',
    },
    {
      url: 'https://placehold.co/600x400/green/white',
      title: 'Verde',
      alt: 'Placeholder color verde',
    },
    {
      url: 'https://placehold.co/600x400/red/white',
      title: 'Rojo',
      alt: 'Placeholder color rojo',
    }];
}
anterior():void{
  this.imagenActual--;
  if(this.imagenActual<0){
    this.imagenActual = this.arrayImagenes.length - 1;
  }
}
siguiente():void{
  this.imagenActual++;
  if(this.imagenActual>this.arrayImagenes.length){
    this.imagenActual = 0;
  }
}
}
