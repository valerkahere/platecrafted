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
  private _serverURL = environment.serverURL;

  public item = signal<Meal | null>(null);

  public items = signal<Meal[] | null>([]);

  public savedItems = signal<Meal[] | null>([]);

  public response = signal<MealResponse | null>(null);

  public searchTerm = signal<string | undefined>(undefined);

  public errorMessage = signal<any>(null);
  private handleError(err: HttpErrorResponse) {
    this.errorMessage.set(err);
    console.log(`TheMealDB ${err.message}`);
    return throwError(() => new Error(`TheMealDB: ${err.message}`));
  }

  // the return value is observable of type ItemDetails
  // by name
  getItemsUser(name?: string) {
    this.searchTerm.set(name);

    const defaultSearchTerm = 'Chicken';
    let fullURL = `${this._apiURL}/search.php?s=${defaultSearchTerm}`;
    if (name) {
      fullURL = `${this._apiURL}/search.php?s=${name}`;
    }
    this._http
      .get<MealResponse>(fullURL)
      .pipe(
        // pipe chain multiples operators together. Takes observable, returns transformte
        // tap - Performs Side Effects: Use it for actions that don't change the data, such as logging to the console, triggering analytics, or updating an external variable.
        tap((data) => console.log('Meal: ' + JSON.stringify(data))),
        catchError((err) => this.handleError(err)),
      )
      .subscribe((data) => {
        this.response.set(data ?? null);
        this.items.set(data.meals ?? null); // null when no results found
      });
  }

  getItemsByLetter(letter?: string) {
    // prevents items from stacking up through the same requests
    this.items.set(null);

    this.searchTerm.set(letter);

    const defaultLetter = 'a';
    let fullURL = `${this._apiURL}/search.php?f=${defaultLetter}`;

    if (letter) {
      fullURL = `${this._apiURL}/search.php?f=${letter}`;
    }
    this._http
      .get<MealResponse>(fullURL)
      .pipe(
        // pipe chain multiples operators together. Takes observable, returns transformte
        // tap - Performs Side Effects: Use it for actions that don't change the data, such as logging to the console, triggering analytics, or updating an external variable.
        tap((data) => console.log('Meal: ' + JSON.stringify(data))),
        catchError((err) => this.handleError(err)),
      )
      .subscribe((data) => {
        this.response.set(data ?? null);
        this.items.set(data.meals ?? null); // null when no results found
      });
  }

  // the return value is observable of type MovieDetails
  getMealById(id: string) {
    const fullURL = `${this._apiURL}/lookup.php?i=${id}`;

    this._http
      .get<MealResponse>(fullURL)
      .pipe(
        // pipe chain multiples operators together. Takes observable, returns transformte
        // tap - Performs Side Effects: Use it for actions that don't change the data, such as logging to the console, triggering analytics, or updating an external variable.
        tap((data) => console.log('Meal: ' + JSON.stringify(data))),
        catchError((err) => this.handleError(err)),
      )
      .subscribe((data) => {
        this.response.set(data ?? null);
        this.item.set(data.meals?.[0] ?? null); // null when no results found
      });
  }

  // add meal to favourites

  addFav(meal: Meal) {
    const fullURL = `${this._serverURL}/meals/`;
    console.log(fullURL);
    console.log(`SEND MEAL: `);
    console.log(meal);
    this._http.post<Meal>(fullURL, meal).subscribe((data) => {});
  }

  // get added meals

  getSavedMeals() {
    const fullURL = `${this._serverURL}/meals`;
    this._http.get<Meal[]>(fullURL).subscribe((data) => {
      this.savedItems.set(data);
    });
  }

  removeFav(idMeal: string) {
    const fullURL = `${this._serverURL}/meals/${idMeal}`;
    // You MUST subscribe
    this._http.delete(fullURL).subscribe(() => {
      console.log('Deleted successfully');
      this.getSavedMeals(); // re-fetch after delete
    });
  }
}
