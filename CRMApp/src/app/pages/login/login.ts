import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { Iuser } from '../../interfaces/iuser';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  private userService = inject(UserService);
  private router = inject(Router);

  async getLogin(loginForm: NgForm){
    const loginUser: Iuser = loginForm.value as Iuser;
    loginUser.expiresInMins = 30; //en minutos

    try{
      let response = await this.userService.login(loginUser);
      console.log(response);

      //almacenamos el token en el localstorage es un map(clave, valor)
      if(response.accessToken){
        localStorage.setItem("accessToken", response.accessToken);
        localStorage.setItem("refreshToken", response.refreshToken);

        this.router.navigate(['/dashboard']);
        loginForm.reset();
      }

    } catch(error){
      alert("Credenciales incorrectas");
      loginForm.reset();
    }
  }
}
