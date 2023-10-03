import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/enviroments/enviroment';
import { HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, tap } from 'rxjs';
import { RequestHandlerService } from './request-handler.service';
import { GitItem, User,UserDto } from '../models/git-result.model';


  @Injectable()
  export class BookmarksService{
    private _baseUrl = environment.API;
    constructor(private http:HttpClient){} 


    saveRepository(Repo: GitItem) {
        return this.http.post<boolean>(
          `${environment.API}GitRepos/saveBookmark`,
          Repo,{
            headers:{'Authorization': `Bearer ${localStorage.getItem("JWTtoken")?? ""}`}
          }
        );
      }

      removeRepository(Repo: GitItem) {
        return this.http.post<boolean>(
          `${environment.API}GitRepos/removeBookmark`,
          Repo,{
            headers:{'Authorization': `Bearer ${localStorage.getItem("JWTtoken")?? ""}`}
          }
        );
      }

      getBookmarksRepositories() {
        let token = localStorage.getItem('JwtToken');
        return this.http.post<GitItem[]>(
          `${environment.API}GitRepos/getRepositoriesBookmark`,
          {},
          {
            headers: {},
            params: {
              repository_name: '',
            },
          }
        );
      }
  }