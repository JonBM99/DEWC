import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HeroeService } from '../../services/heroe-service';
import { Iheroe } from '../../interfaces/iheroe';

@Component({
  selector: 'app-heroesform',
  imports: [ReactiveFormsModule],
  templateUrl: './heroesform.html',
  styleUrl: './heroesform.css',
})
export class Heroesform {
newCharacterForm: FormGroup;
  characterService = inject(HeroeService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  isNew: boolean;

  constructor() {
    this.newCharacterForm = new FormGroup({
      id: new FormControl(null, []),
      name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      fullName: new FormControl(null, []),
      alterEgos: new FormControl(null, []),
      placeOfBirth: new FormControl(null, []),
      firstAppearance: new FormControl(null, []),
      publisher: new FormControl(null, []),
      alignment: new FormControl('NEUTRAL', [Validators.required]),
      gender: new FormControl(null, []),
      race: new FormControl(null, []),
      height: new FormControl(null, []),
      weight: new FormControl(null, []),
      eyeColor: new FormControl(null, []),
      hairColor: new FormControl(null, []),
      occupation: new FormControl(null, []),
      base: new FormControl(null, []),
      imageUrl: new FormControl(null, []),
      powerStats: new FormGroup({
        id: new FormControl(null, []),
        intelligence: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(100)]),
        strength: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(100)]),
        speed: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(100)]),
        durability: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(100)]),
        power: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(100)]),
        combat: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(100)])
      })
    });
    this.isNew = true;
  }

  async getDataForm() {
    if (this.newCharacterForm.invalid) return;

    let character = this.newCharacterForm.value as Iheroe;

    try {
      if (this.isNew) {
        await this.characterService.createCharacter(character);
        Swal.fire({
          title: "Added",
          text: "Character successfully added",
          icon: "success"
        });
      } else {
        await this.characterService.updateCharacter(character.id!, character);
        Swal.fire({
          title: "Updated",
          text: "Character successfully updated",
          icon: "success"
        });
      }
      this.router.navigate(['/characters']);
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Error saving character",
        icon: "error"
      });
    }
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async (params: any) => {
      let id: string = params.id;
      if (id != undefined) {
        try {
          let character = await this.characterService.getCharacterById(Number(id));
          if (character != undefined) {
            this.isNew = false;
            this.newCharacterForm.patchValue(character);
          }
        } catch (error) {
          Swal.fire({
            title: "Error",
            text: "Character not found",
            icon: "error"
          });
          this.router.navigate(['/characters']);
        }
      }
    });
  }

  checkControl(formControlName: string, validator: string): boolean | undefined {
    return this.newCharacterForm.get(formControlName)?.hasError(validator) &&
           this.newCharacterForm.get(formControlName)?.touched;
  }
}
