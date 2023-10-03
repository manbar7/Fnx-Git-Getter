import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/enviroments/enviroment';
import { HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, tap } from 'rxjs';
import { RequestHandlerService } from './request-handler.service';
import { User,UserDto } from '../models/git-result.model';
const headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set( 'Access-Control-Allow-Origin', '*')

  @Injectable()
  export class AuthService{
    private _baseUrl = environment.API;
    constructor(private http:HttpClient){} 


    Login(user : User) {
        return this.http.post(`${this._baseUrl}api/Auth/login`,{
            username : user.Username,
            password : user.Password,
        },{ responseType: 'text' });
    }


      Login2(credentials:any) {
        return this.http.post(`${this._baseUrl}api/Auth/login`,credentials,{ responseType: 'text' });
    }
  }