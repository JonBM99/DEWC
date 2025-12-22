import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { Userservices } from '../../services/userservices';
import { IUsers } from '../../interfaces/iusers';


@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css',
})
export class UserForm {

  newUserForm: FormGroup;
  userServices = inject(Userservices);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  isNew: boolean;
  emailPattern: string = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";

  constructor(){
    this.newUserForm = new FormGroup({
      _id: new FormControl(null,[]),
      id: new FormControl(null, []),
      first_name: new FormControl(null,[Validators.required, Validators.minLength(3)]),
      last_name: new FormControl(null,[Validators.required,  Validators.minLength(3)],),
      username: new FormControl(null,[Validators.required, Validators.minLength(3)]),
      email: new FormControl(null,[Validators.required,Validators.pattern(this.emailPattern)]),
      image: new FormControl(null,[Validators.required]),
      password: new FormControl(null,[Validators.required, Validators.minLength(8)])
    });
    this.isNew = true;
  }

  async getDataForm(){
    if(this.newUserForm.invalid) return;

    let user = this.newUserForm.value as IUsers;
    if(this.isNew){
      user.id = -1; //El id lo gestiona el backend, le ponemos -1 para que no de error
      await this.userServices.createUser(user);
      Swal.fire({
        title: "Añadido correctamente",
        text: "Se ha creado correctamente el usuario",
        icon: "success"
      });
    }
    else{
      await this.userServices.updateUser(user);
      Swal.fire({
        title: "Editado correctamente",
        text: "Se ha editado correctamente el usuario",
        icon: "success"
      });
    }
    this.router.navigate(['home']);
  }


  ngOnInit(): void{
    this.activatedRoute.params.subscribe(async (params: any) =>{
      let _id: string = params._id;
      if(_id != undefined){
        let user = await this.userServices.getUserById(_id);
        if(user != undefined){
          this.isNew = false;
          this.newUserForm.patchValue(user);
        } else if(user == null){
          Swal.fire({
            title: "Error",
            text: "Se ha producido un error al conectar con el servicio",
            icon: "error"
          });
          this.router.navigate(['home']);
        } else{
          Swal.fire({
            title: "Desconocido",
            text: "No se encuentra el usuario en nuestro servicio",
            icon: "error"
          });
          this.router.navigate(['/home']);
        }
      }
    })
  }

  checkControl(FormControlName: string, validator: string): boolean | undefined{
    return this.newUserForm.get(FormControlName)?.hasError(validator) && this.newUserForm.get(FormControlName)?.touched;
  }
}
