import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Loginservice } from '../../services/loginservice';
import { Router, RouterLink } from '@angular/router';
import { IUser } from '../../interfaces/iuser';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  private loginServices = inject(Loginservice);
  private router = inject(Router);

  ngOnInit(): void{
    if(localStorage.getItem('accessToken')){
      this.router.navigate(['/dashboard']);
    }
  }

  async getLoginInfo(loginForm: NgForm){
    const loginData = loginForm.value as IUser;
    loginData.expiresInMin = 1;
    try{
      let response = await this.loginServices.login(loginData);
      if(response.accessToken && response.refreshToken){
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        localStorage.setItem('role', response.gender); //voy a simular que existe un rol admin con el genero femenino y el masculino seria un usuario corriente
        this.router.navigate(['/dashboard']);
        loginForm.reset();
      }
    } catch(error){
      console.error('Error al iniciar sesión:', error);
      loginForm.reset();
    }
  }
}
