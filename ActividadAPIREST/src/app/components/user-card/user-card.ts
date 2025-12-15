import { Router } from '@angular/router';
import { UserServices } from './../../services/user-services';
import { Component, inject, Input } from '@angular/core';
import { IUser } from '../../interfaces/iuser';

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

  async deleteUser(user:IUser){
    const response = await this.userServices.deleteById(user._id);

    if(response._id){
      alert("Se ha eliminado correctamente al usuario " + user.username);
    } else{
      alert("NO se ha eliminado correctamente al usuario " + user.username);
    }
  }
}
