export interface GitResult {
    total_count:number,
    incomplete_results:boolean,
    items:[]
}

export interface GitItem {
    id:number,
    node_id:string,
    name:string,
    full_name:string,
    bookmarked?:boolean,
    status?:string,
    owner: {
        avatar_url:string        
    }
}


export interface User {
    Username: string;
    Password: string;
  }
  
  export interface UserDto {
    username: string;
    passwordHash: string;
    passwordSalt: string;
  }
  
  export interface Token {
    token: string;
  }