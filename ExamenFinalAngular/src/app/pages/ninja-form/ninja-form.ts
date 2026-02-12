import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NinjaService } from '../../services/ninja-service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { INinja } from '../../interfaces/ininja';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ninja-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './ninja-form.html',
  styleUrl: './ninja-form.css',
})
export class NinjaForm {

  newNinjaForm: FormGroup;
  ninjaService = inject(NinjaService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  isNew: boolean;

  constructor() {
    this.newNinjaForm = new FormGroup({
      id: new FormControl(null,[]),
      ninjaname: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      affiliation: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      clan: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      fullname: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      gender: new FormControl(null, [Validators.required]),
      image1: new FormControl(null, [Validators.required]),
      image2: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      level: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      naturetype: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      stats: new FormGroup({
        id: new FormControl(null, []),
        genjutsu: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(100)]),
        handseals: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(100)]),
        intelligence: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(100)]),
        ninjutsu: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(100)]),
        speed: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(100)]),
        stamina: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(100)]),
        strength: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(100)]),
        taijutsu: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(100)])
      })
    });
    this.isNew = true;
  }

  async getDataForm(){
    if(this.newNinjaForm.invalid) return;
    let ninja = this.newNinjaForm.value as INinja;
    if(this.isNew){
      await this.ninjaService.createNinja(ninja);
      Swal.fire({
        title: "Añadido",
        text: "Ninja añadido correctamente",
        icon: "success"
      });
    }
    else{
      await this.ninjaService.updateNinja(ninja);
      Swal.fire({
        title: "Actualizado",
        text: "Ninja actualizado correctamente",
        icon: "success"
      });
    }
    this.router.navigate(['ninjas'])
  }

  ngOnInit(): void{
    this.activatedRoute.params.subscribe(async(params: any)=>{
      let id:number = params.id;
      if(id != undefined){
        let ninja = await this.ninjaService.getNinjaById(id);
        if(ninja != undefined){
          this.isNew = false;
          this.newNinjaForm.patchValue(ninja);
        } else if(ninja == null){
          Swal.fire({
            title: "Error",
            text: "Error conectando con el servidor",
            icon: "error"
          });
          this.router.navigate(['ninjas']);
        } else{
          Swal.fire({
            title: "Error",
            text: "No existe en nuestro servidor",
            icon: "error"
          });
          this.router.navigate(['ninjas']);
        }
      }
    })
  }

  checkControl(FormControlName: string, validator: string): boolean | undefined {
    return this.newNinjaForm.get(FormControlName)?.hasError(validator) && this.newNinjaForm.get(FormControlName)?.touched;
  }
}
