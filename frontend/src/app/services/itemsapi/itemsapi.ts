import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, signal, inject } from '@angular/core';
import { Movie } from '../../models/meal.interface';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Itemsapi {



  private _http = inject(HttpClient);

  // private _apiUrl = "http://localhost:5050";
  private _apiURL = environment.apiURL;
  
  // Movie[] - an array of objects type Movie
  // ([]) - Initially empty
  public movies = signal<Movie[]>([]);
  
   // return all Movie from database
  getItems() {
    const url = `${this._apiURL}/movies`;
    this._http.get<Movie[]>(url)
      .subscribe(data => {
          this.movies.set(data);
      });
  }

  // make posters safe (otherwise don't display in <object>)
  // https://angular.dev/best-practices/security#trusting-safe-values

      // for sanitizing posters
    private sanitizer = inject(DomSanitizer);
  // TO BE RUN WHEN NEEDED BECAUSE PROCESSING
//   updatePosterUrl() {
//     // for each poster
//     // take poster
//     // make it safe
//     // replace it in the movie ???
//     for (let index = 0; index < this.movies().length; index++) {
//         const currentMovie = this.movies()[index];
//         const safePoster = this.sanitizer.bypassSecurityTrustResourceUrl(this.movies()[index].poster);
//         this.movies()[index].poster = safePoster.toString();
//     }

    
//   }

  // add one movie
  addItem(myTitle: string, myYear: number | null, myPoster:string) {
      const url = `${this._apiURL}/movies`;
      let movie = {title:myTitle, year:myYear, poster:myPoster}
      this._http.post<Movie[]>(url, movie)
      .subscribe(data => {  
          this.getItems();
      });
  }

  // delete car by id
  deleteItem(myId:string) {
    const url = `${this._apiURL}/movies/${myId}`;
    this._http.delete(url)
    .subscribe(data => { 
      this.getItems();
    });
  }
}
