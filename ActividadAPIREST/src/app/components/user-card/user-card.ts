import { Router } from '@angular/router';
import { UserServices } from './../../services/user-services';
import { Component, inject, Input } from '@angular/core';
import { IUser } from '../../interfaces/iuser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-card',
  imports: [],
  templateUrl: './user-card.html',
  styleUrl: './user-card.css',
})
export class UserCard {

  userServices = inject(UserServices);
  router = inject(Router);
  @Input() miUser!: IUser;

  async deleteUser(miUser:IUser){
    const response = await this.userServices.deleteById(miUser._id);
    if(response._id){
      Swal.fire({
        title: "Eliminado",
        text: "Se ha eliminado correctamente al usuario " + miUser.username,
        icon: "success"
      });
    } else{
      Swal.fire({
        title: "No se ha eliminado",
        text: "No se ha conseguido eliminar al usuario " + miUser.username,
        icon: "error"
      });
    }
  }
}
