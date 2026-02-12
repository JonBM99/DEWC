import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login-service';
import { IUser } from '../../interfaces/iuser';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  private loginServices = inject(LoginService);
  private router = inject(Router);

  ngOnInit():void{
    if(localStorage.getItem('token')){
      this.router.navigate(['/dashboard']);
    }
  }

  async getLoginInfo(loginForm: NgForm){
    const loginData = loginForm.value as IUser;
    try{
      let response = await this.loginServices.login(loginData);
      if(response.token){
        localStorage.setItem('token', response.token);
        this.router.navigate(['/dashboard']);
        loginForm.reset();
      }
    } catch(error){
      console.error('Error al iniciar sesión:', error);
      loginForm.reset();
    }
  }
}
