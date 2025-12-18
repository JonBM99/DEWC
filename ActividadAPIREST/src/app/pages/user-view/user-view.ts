import { Component, inject } from '@angular/core';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { UserServices } from '../../services/user-services';
import { IUser } from '../../interfaces/iuser';

@Component({
  selector: 'app-user-view',
  imports: [RouterLink],
  templateUrl: './user-view.html',
  styleUrl: './user-view.css',
})
export class UserView {
  user!: IUser;
  userServices = inject(UserServices);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  ngOnInit(): void{

  }
}
