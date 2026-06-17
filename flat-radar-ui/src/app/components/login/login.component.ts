import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LoginRequest } from 'src/app/models/login-request';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email :string = '';
  password:string ='';

  constructor(private authService:AuthService){}

  loginUser(){

    let credentials:LoginRequest= {
      email:this.email,
      password:this.password
    };

    this.authService.login(credentials)
      .subscribe(response=>{
        console.log(response);
        localStorage.setItem("token",response.token);
      });
  }

}
