import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/enviroments/enviroment';
import { GitResult } from '../models/git-result.model';


@Injectable()
export class HomeService { 
    
    constructor(private http: HttpClient) { }

   getRepositories(searchValue: string,pageIndexString:string) {
    var newValue = searchValue+"&page="+pageIndexString;
    return this.http.post<GitResult>(
      `${environment.API}GitRepos/getRepositories`,
      {},
      {
        headers: {},
        params: {
          repository_name: newValue,
        },
      }
    );
  }

}
