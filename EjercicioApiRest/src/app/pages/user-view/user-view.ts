import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IUsers } from '../../interfaces/iusers';
import { Userservices } from '../../services/userservices';

@Component({
  selector: 'app-user-view',
  imports: [RouterLink],
  templateUrl: './user-view.html',
  styleUrl: './user-view.css',
})
export class UserView {

  user!: IUsers;
  userServices = inject(Userservices);
  activateRoute = inject(ActivatedRoute);
  constructor() {}

  ngOnInit(): void {
    this.activateRoute.params.subscribe(async (params: any) => {
      let _id = params._id;
      if(_id != undefined){
        let response = await this.userServices.getUserById(_id);
        if(response != undefined){
          this.user = response;
        }
      }
    });
  }
}
