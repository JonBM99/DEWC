import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Userservice } from '../../services/userservice';
import { Iusuario } from '../../interfaces/iusuario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css',
})
export class UserForm {

  newUserForm: FormGroup;
  userService = inject(Userservice);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  isNew: boolean;
  emailPattern: string = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";

  constructor() {
    this.newUserForm = new FormGroup({
      _id: new FormControl(null,[]),
      id: new FormControl(null, []),
      first_name: new FormControl(null,[Validators.required, Validators.minLength(3)]),
      last_name: new FormControl(null,[Validators.required,  Validators.minLength(3)],),
      username: new FormControl(null,[Validators.required, Validators.minLength(3)]),
      email: new FormControl(null,[Validators.required,Validators.pattern(this.emailPattern)]),
      image: new FormControl(null,[Validators.required]),
      password: new FormControl(null,[Validators.required, Validators.minLength(8)],),
      powerStats: new FormGroup({  //tengo que hacer un formGroup dentro de otro formGroup para poder validar los powerStats
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

  async getDataForm(){
    if(this.newUserForm.invalid) return;
    let user = this.newUserForm.value as Iusuario;
    if(this.isNew){
      user.id = -1;
      await this.userService.createUser(user);
      Swal.fire({
        title: "Added",
        text: "User successfully added",
        icon: "success"
      });
    }
    else{
      await this.userService.updateUser(user);
      Swal.fire({
        title: "Updated",
        text: "User successfully updated",
        icon: "success"
      });
    }
    this.router.navigate(['/users']);
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async(params: any) => {
      let _id: string = params._id;
    if(_id != undefined){
      let user = await this.userService.getUserById(_id);
      if(user != undefined){
        this.isNew = false;
        this.newUserForm.patchValue(user);
      } else if(user == null){
        Swal.fire({
            title: "Error",
            text: "Error connecting to server",
            icon: "error"
          });
        this.router.navigate(['/users']);
      } else{
        Swal.fire({
            title: "Unkown",
            text: "Doesnt exist in our server",
            icon: "error"
          });
        this.router.navigate(['/users']);
        }
      }
    });
  }

  checkControl(FormControlName: string, validator: string): boolean | undefined {
    return this.newUserForm.get(FormControlName)?.hasError(validator) && this.newUserForm.get(FormControlName)?.touched;
  }
}
