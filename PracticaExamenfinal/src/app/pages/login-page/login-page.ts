import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { UserServices } from '../../services/user-services';
import { IUser } from '../../interfaces/iuser';

@Component({
  selector: 'app-login-page',
  imports: [FormsModule, RouterLink],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {

  private userServices = inject(UserServices);
  private router = inject(Router);

  async getLogin(loginForm: NgForm){
    const loginUser: IUser = loginForm.value as IUser;
    loginUser.expiresInMins = 30;

    try{
      let response = await this.userServices.login(loginUser);
      console.log(response);
      if(response.accessToken){
        localStorage.setItem("accessToken", response.accessToken);
        localStorage.setItem("refreshToken", response.refreshToken);
        this.router.navigate(['/home']);
        loginForm.reset();
      }
    }catch(error){
      alert("Credenciales incorrectas");
      loginForm.reset();
    }
  }
}
