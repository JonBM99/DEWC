import { UserServices } from './../../services/user-services';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { Iuser } from '../../interfaces/iuser';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  private userServices = inject(UserServices);
  private router = inject(Router);

  ngOnInit(): void {
    if(localStorage.getItem('accessToken')) {
      this.router.navigate(['/home']);
    }
  }

  async getLoginInfo(loginForm: NgForm){
    const loginUser: Iuser = loginForm.value as Iuser;
    loginUser.expiresInMins = 30;
    try{
      let response = await this.userServices.login(loginUser);
      console.log(response);
      if(response.accessToken && response.refreshToken){
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        this.router.navigate(['/home']);
        loginForm.reset();
      }
    } catch (error) {
      console.error('Login failed', error);
      loginForm.reset();
    }
  }
}
