import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { HeroServices } from '../../services/hero-services';
import { IHeroes } from '../../interfaces/iheroes';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hero-form',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './hero-form.html',
  styleUrl: './hero-form.css',
})
export class HeroForm {

  newHeroeform: FormGroup;
  heroesServices = inject(HeroServices);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  isNew: boolean;

  constructor(){
    this.isNew = true;
    this.newHeroeform = new FormGroup({
      id: new FormControl(null,[]),
      heroname: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      fullname: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      image1: new FormControl(null,[Validators.required]),
      image2: new FormControl(null,[Validators.required]),
      image3: new FormControl(null,[Validators.required]),
      gender: new FormControl(null,[Validators.required]),
      race: new FormControl(null,[Validators.required]),
      alignment: new FormControl(null,[Validators.required]),
      powerstats: new FormControl(null,[])
    });
  }

  async getDataForm(){
    if(this.newHeroeform.invalid) return;
    let heroe = this.newHeroeform.value as IHeroes;
    if(this.isNew){
      heroe.id = -1;
      await this.heroesServices.createHeroe(heroe);
      Swal.fire({
        title: "Añadido",
        text: "Heroe añadido correctamente",
        icon: "success"
      });
    }
    else{
      await this.heroesServices.updateHeroe(heroe);
      Swal.fire({
        title: "Actualizado correctamente",
        text: "Se ha actualizado correctamente el heroe",
        icon: "success"
      });
    }
    this.router.navigate(['/heroes'])
  }

  ngOnInit(): void{
    this.activatedRoute.params.subscribe(async (params: any) =>{
      let id: number = params.id;
      if(id != undefined){
        let heroe = await this.heroesServices.getHeroeById(id);
        if(heroe != undefined){
          this.isNew = false;
          this.newHeroeform.patchValue(heroe);
        } else if(heroe == null){
          Swal.fire({
            title: "Error",
            text: "Error en la conexion con el servidor",
            icon: "error"
          });
          this.router.navigate(['heroes']);
        } else{
          Swal.fire({
            title: "Desconocido",
            text: "No existe en nuestro server",
            icon: "error"
          });
          this.router.navigate(['/heroes']);
        }
      }
    })
  }

  checkControl(FormControlName: string, validator: string): boolean | undefined{
    return this.newHeroeform.get(FormControlName)?.hasError(validator) && this.newHeroeform.get(FormControlName)?.touched;
  }
}
