import { environment } from '../../enviroments/enviroment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';

@Injectable()
export class RequestHandlerService {

  private _baseUrl = environment.API;

  constructor(
    private http: HttpClient,
  ) {

  }

  get(path: string, params?: any): Observable<any> { 
    const httpOptions = {
      headers: new HttpHeaders({
        }),
        observe: 'response' as 'body',
        params: params
    };
    httpOptions.headers = httpOptions.headers.append('Access-Control-Allow-Origin', '*');
    httpOptions.headers = httpOptions.headers.append('Content-Type', 'application/json');
    return this.http.get(`${this._baseUrl}` , httpOptions).pipe(
      map((response: any) => response.body ))
  }

  post(path: string , body: any , params?: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
      }),
      observe: 'response' as 'body',
      params
    };
    httpOptions.headers = httpOptions.headers.append('Access-Control-Allow-Origin', '*');
    httpOptions.headers = httpOptions.headers.append('Content-Type', 'application/json');
    return this.http.post(`${this._baseUrl}GitSearch`, body , httpOptions )
    .pipe(
      tap((response: any) => this.extractHeaders(response.headers)) ,
      map((response: any) => response.body ) ,
        );
  }

 
  private extractHeaders(headers: Headers) {
    const token = headers.get('token');
    if (token) {
      localStorage.setItem("local", JSON.stringify(token));
    }
  }
}
