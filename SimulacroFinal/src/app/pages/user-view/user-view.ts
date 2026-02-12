import { Component, inject } from '@angular/core';
import { Iusuario } from '../../interfaces/iusuario';
import { Userservice } from '../../services/userservice';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-view',
  imports: [RouterLink],
  templateUrl: './user-view.html',
  styleUrl: './user-view.css',
})
export class UserView {

  user!: Iusuario;
  userService = inject(Userservice);
  activatedRoute = inject(ActivatedRoute);
  constructor() {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async (params: any) => {
      let _id: string = params._id;
      if(_id != undefined) {
        let response = await this.userService.getUserById(_id);
        if(response != undefined){
          this.user = response;
        }
      }
    });
  }
}
