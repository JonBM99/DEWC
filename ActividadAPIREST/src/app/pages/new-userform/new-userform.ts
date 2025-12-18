import { UserServices } from './../../services/user-services';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from '../../interfaces/iuser';
import {v4 as uuidv4} from 'uuid';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-new-userform',
  imports: [ReactiveFormsModule],
  templateUrl: './new-userform.html',
  styleUrl: './new-userform.css',
})
export class NewUserform {

  newUserForm: FormGroup;
  userServices = inject(UserServices);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  isNew: boolean;

  constructor(){
    this.newUserForm = new FormGroup({
      _id: new FormControl(null,[]),
      id: new FormControl(null, []),
      first_name: new FormControl(null,[Validators.required]),
      last_name: new FormControl(null,[Validators.required]),
      username: new FormControl(null,[Validators.required]),
      email: new FormControl(null,[Validators.required,Validators.email]),
      image: new FormControl(null,[Validators.required]),
      password: new FormControl(null,[Validators.required, Validators.minLength(8)])
    });
    this.isNew = true;
  }

  getDataForm(){
    let user = this.newUserForm.value as IUser;
    if(this.isNew){
      user._id = uuidv4();
      this.userServices.insertUser(user);
      Swal.fire({
        title: "Añadido correctamente",
        text: "Se ha creado correctamente el usuario",
        icon: "success"
      });
    }
    else{
      this.userServices.updateUser(user);
      Swal.fire({
        title: "Editado correctamente",
        text: "Se ha editado correctamente el usuario",
        icon: "success"
      });
    }
    this.router.navigate(['home']);
  }

  checkControl(FormControlName: string, validator: string): boolean | undefined{
    return this.newUserForm.get(FormControlName)?.hasError(validator) && this.newUserForm.get(FormControlName)?.touched;
  }

  ngOnInit(): void{
    this.activatedRoute.params.subscribe(async (params: any) =>{
      let id: string = params._id;
      if(id != undefined){
        let user = await this.userServices.getById(id);
        if(user != undefined){
          this.isNew = false;
          this.newUserForm = new FormGroup({
            _id: new FormControl(user._id,[]),
            id: new FormControl(user.id, []),
            first_name: new FormControl(user.first_name,[Validators.required]),
            last_name: new FormControl(user.last_name,[Validators.required]),
            username: new FormControl(user.username,[Validators.required]),
            email: new FormControl(user.email,[Validators.required,Validators.email]),
            image: new FormControl(user.image,[Validators.required]),
            password: new FormControl(user.password,[Validators.required, Validators.minLength(8)])
          },[]);
        } else{
          Swal.fire({
            title: "Desconocido",
            text: "No se encuentra el usuario en nuestro servicio",
            icon: "error"
          });
        }
      }
    })
  }
}
