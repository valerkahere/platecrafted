import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, tap, throwError, take } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Meal, MealResponse } from '../../models/meal.interface';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  private _http = inject(HttpClient);
  private _apiURL = environment.apiURL;

  public item = signal<Meal | null>(null);
  public items = signal<Meal[] | null>([]);

  public response = signal<MealResponse | null>(null);


  public errorMessage = signal<any>(null);
  private handleError(err:HttpErrorResponse) {
        this.errorMessage.set(err);
        console.log(`TheMealDB ${err.message}`)
        return throwError(() => new Error(`TheMealDB: ${err.message}`))
    }



   // the return value is observable of type ItemDetails
   // by name
    // getItem(name: string) {
    //     const fullURL = `${this._apiURL}/search.php?s=${name}`;
    //     this._http.get<MealResponse>(fullURL)
    //     .pipe( // pipe chain multiples operators together. Takes observable, returns transformte
    //         // tap - Performs Side Effects: Use it for actions that don't change the data, such as logging to the console, triggering analytics, or updating an external variable.
    //         tap(data => console.log("Meal: " + JSON.stringify(data))
    //     ),
    //         catchError((err) => this.handleError(err))
    //     ) 
    //     .subscribe(data => {
    //         this.item.set(data.meals[0] ?? null);
    //     })
        
    // }

     // return all meals from api


  getItems() {
    const fullURL = `${this._apiURL}/search.php?s=Chicken`;
    this._http.get<MealResponse>(fullURL) 
      .subscribe(data => {
          console.log(data);
          this.response.set(data ?? null);
          this.items.set(data.meals ?? null); // null when no results found
          
      });
  }

    // add one movie

  //   addItem(myTitle: string, myYear: number | null, myPoster:string) {
  //     const url = `${this._apiURL}/movies`;
  //     let movie = {title:myTitle, year:myYear, poster:myPoster}
  //     this._http.post<Movie[]>(url, movie)
  //     .subscribe(data => {  
  //         this.getItems();
  //     });
  // }

  // // delete car by id
  //  deleteItem(myId:string) {
  //   const url = `${this._apiURL}/movies/${myId}`;
  //   this._http.delete(url)
  //   .subscribe(data => { 
  //     this.getItems();
  //   });
  // }

}
