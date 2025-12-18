import { IUser } from '../../interfaces/iuser';
import { UserServices } from './../../services/user-services';
import { Component, inject } from '@angular/core';
import { UserCard } from "../../components/user-card/user-card";

@Component({
  selector: 'app-home',
  imports: [UserCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

    usersArray: IUser[];
    userServices = inject(UserServices);

    constructor(){
      this.usersArray = [];
    }

    async ngOnInit(): Promise<void> {
      try{
        this.usersArray = await this.userServices.getAllUsers();
      }catch(error){
        console.error('No se han podido obtener los usuarios:', error);
      }
    }
}
