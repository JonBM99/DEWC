import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { LoginServices } from '../../services/login-services';
import { Iuser } from '../../interfaces/iuser';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  private loginServices = inject(LoginServices);
  private router = inject(Router);

  ngOnInit(): void{
    if(localStorage.getItem('token')){
      this.router.navigate(['/home'])
    }
  }

  async getLoginInfo(loginForm:NgForm){
    const loginData = loginForm.value as Iuser;
    try{
      let response = await this.loginServices.login(loginData);
      console.log(response);
      if(response.token){
        localStorage.setItem('token', response.token);
        this.router.navigate(['/home']);
        loginForm.reset();
      }
    } catch(error){
      console.error('Login failed', error);
      loginForm.reset();
    }
  }
}
