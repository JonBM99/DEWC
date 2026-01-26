import { Component, inject } from '@angular/core';
import { FormsModule, NgForm} from '@angular/forms';
import { LoginServices } from '../../services/login-services';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  loginServices = inject(LoginServices);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  constructor(){}

  ngOnInit(): void {
    if(localStorage.getItem('token')){
      this.router.navigate(['/home'])
    }
  }

  async getLoginInfo(loginForm: NgForm) {
    const loginData = loginForm.value
    try {
      let response = await this.loginServices.login(loginData);
      console.log(response);
      if(response.token){
        localStorage.setItem('token', response.token);
        this.router.navigate(['/home']);
        loginForm.reset();
      }
    } catch (error) {
      console.error('Login failed', error);
      loginForm.reset();
    }
  }
}
