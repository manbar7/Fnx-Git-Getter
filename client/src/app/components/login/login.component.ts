import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/git-result.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  invalidLogin:boolean = false;
  username:string ='';
  password:string = '';
constructor(private router:Router,public authService:AuthService) {}


login(form: NgForm) {
  const credentials:User = {
    Username: form.value.username,
    Password:form.value.password
  }
  credentials.Username = this.username;
  credentials.Password = this.password;
  this.authService.Login(credentials).subscribe({      
    next: (res:string) => {
      if(res){
        localStorage.setItem('JWTtoken', res);
           this.invalidLogin = false;
        this.router.navigate(["/home"]);
      }   
    },
    error: (e:any) => {
      alert(e.error)
         this.invalidLogin = true;
        console.log("invalid login ",e)
    },
  })}


}
