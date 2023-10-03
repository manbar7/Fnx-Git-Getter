import { Component, OnInit } from '@angular/core';
import { GitItem, GitResult } from 'src/app/models/git-result.model';
import { HomeService } from 'src/app/services/home.service';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { EMPTY, from } from 'rxjs';
import { BookmarksService } from 'src/app/services/bookmarks.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  implements OnInit  {
  isLoading:boolean = false;
  searchValue:string = "";
  searchResponse:GitResult | undefined;
  searchResults:GitItem[] = [];
  bookmarks: GitItem[] = [];
  bookmarksTemp:GitItem[] = [];
  hasLoad:boolean = false;
  pageIndex:number = 1;
  isFirstPage:boolean = true;
  showBookmarks:boolean = false;
  isBookmarksEmpty:boolean = false;
  showEmptyBookmarksLabel:boolean = false;
  hideSearchResults:boolean = false;
  constructor(public homeService:HomeService,private router:Router,private jwtHelper: JwtHelperService, public bookmarksService:BookmarksService) {}

  ngOnInit(): void {
  this.loadBookmarks();
  }

  
 // api call for search value
  Search(event?:any) {
   this.isLoading= true;
   this.showEmptyBookmarksLabel = false;

    this.homeService.getRepositories(this.searchValue,this.pageIndex.toString()).subscribe({
      next: (res: any) => {
        this.hasLoad = true;
        this.showBookmarks = false;
        if (this.pageIndex > 1 ) this.isFirstPage = false;
        else if (this.pageIndex == 1 ) this.isFirstPage = true;
        this.isLoading = false;
        this.searchResponse = res ;
        this.searchResults = this.searchResponse?.items ? this.searchResponse?.items : [];
         this.searchResults.map(git => {
        const isExist = this.bookmarks.some(item => item.id === git.id) ;
          if (isExist) git.bookmarked = true;
         })
    },
    error:(error:any) => {
      console.log(error);
    }
  })}

//api call for next page results
  NextPage(){
    this.pageIndex++;
    this.Search();
  }

  PreviousPage(){
    if (this.pageIndex !== 0 ) this.pageIndex--;  
    this.Search();
  }

  //clears search value and results
  ClearSearch() {
    this.searchValue = "";
    this.searchResponse = undefined;
    this.searchResults = [];
    this.hasLoad = false;
    this.bookmarks = [];
  }


  isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem("JWTtoken");
    if (token && !this.jwtHelper.isTokenExpired(token)){
      return true;
    }
    return false;
  }


  logOut() {
    localStorage.removeItem("JWTtoken");
    this.router.navigate(["/login"]);
  }

  
// adds repo to bookmarks
addToBookmarks(result:any){
  if (result.bookmarked === undefined) result.bookmarked = true;
                result.bookmarked = !result.bookmarked;
  if (result.bookmarked === false) {
    this.removeItemFromBookmarks(result);
    const index = this.searchResults.findIndex(obj => {
      return obj.id === result.id;
     });
     this.searchResults[index].bookmarked = index > 0 ?  false : undefined;
    } 
    else {
    this.bookmarksService.saveRepository(result).subscribe({
      next: (res: any) => {
        console.log("SUCCESS: Bookmark added!", res);
        this.showEmptyBookmarksLabel = false;
    },
    error: (error: any) => {
      console.log(error);
    }
    })
  } 
}

//removes repo from bookmarks
removeItemFromBookmarks(bookmark:any){
    const index: number = this.bookmarks.indexOf(bookmark);
    this.bookmarks.splice(index, 1);
    bookmark.bookmarked = !bookmark.bookmarked;
    this.bookmarksService.removeRepository(bookmark).subscribe({
         next: (res:any) => {
         if (res == true) console.log("Bookmark removed successfully");
         this.bookmarks = [];
         this.showEmptyBookmarksLabel = false;
         this.loadBookmarks();
         },
         error: (error:any) => console.log("failed to remove bookmark")})
}

// turns on/off flag of bookmarks
ShowSavedBookmarks(){
  if (this.bookmarks.length < 1) {
    this.isBookmarksEmpty = true;
    this.showEmptyBookmarksLabel = true;
    this.showBookmarks = false;
    } 
    this.showBookmarks = true;
    this.isBookmarksEmpty = false;
    this.showEmptyBookmarksLabel = false;
    this.loadBookmarks();
}
// 
loadBookmarks(){
    this.bookmarks = [];
    this.bookmarksService.getBookmarksRepositories().subscribe({
    next: (res:any[]) => {
      if (res == null) {
        this.showBookmarks = false;
        this.isBookmarksEmpty = true;
        this.showEmptyBookmarksLabel = true;    
         } 
        else if (res != null) {
        this.bookmarks = res;
        } 
    },
    error: (error:any) => {
     alert("Error: "+ JSON.stringify(error))
    }
  })
}


}
