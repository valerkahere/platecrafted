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

  // Error handling
  public errorMessage = signal<any>(null);
  public apiError = signal<true | false>(false);

  // for the frontend to track whether connected
  // to DB or not
  public dbStatus = signal<'idle' | 'loading' | 'success' | 'error'>(
    'idle',
  );
  constructor() {}

  private handleError = (err: HttpErrorResponse) => {
    this.errorMessage.set(err.message);
      this.dbStatus.set('error');
    console.log(`TheMealDB ${err.message}`);
    return throwError(() => new Error(`TheMealDB: ${err.message}`));
  };

  // THE MEAL DB API METHODS

  // by name
  getItemsByName(name?: string) {
    this.apiError.set(false);
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
      .subscribe({
        // next - data has arrived
        next: (data) => {
          this.response.set(data ?? null);
          this.items.set(data.meals ?? null); // null when no results found
        },
        error: (data) => {
          this.apiError.set(true);
        },
      });
  }

  getItemsByLetter(letter?: string) {
    this.apiError.set(false);
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
      .subscribe({
        next: (data) => {
          this.response.set(data ?? null);
          this.items.set(data.meals ?? null); // null when no results found
        },
        error: (data) => {
          this.apiError.set(true);
        },
      });
  }

  getRandomItem() {
    this.apiError.set(false);
    const fullURL = `${this._apiURL}/random.php`;

    this._http
      .get<MealResponse>(fullURL)
      .pipe(
        // pipe chain multiples operators together. Takes observable, returns transformte
        // tap - Performs Side Effects: Use it for actions that don't change the data, such as logging to the console, triggering analytics, or updating an external variable.
        tap((data) => console.log('Meal: ' + JSON.stringify(data))),
        catchError((err) => this.handleError(err)),
      )
      .subscribe({
        next: (data) => {
          this.response.set(data ?? null);
          this.item.set(data.meals?.[0] ?? null); // null when no results found
        },
        error: (data) => {
          this.apiError.set(true);
        },
      });
  }

  // the return value is observable of type MovieDetails
  getMealById(id: string) {
    this.apiError.set(false);
    const fullURL = `${this._apiURL}/lookup.php?i=${id}`;

    this._http
      .get<MealResponse>(fullURL)
      .pipe(
        // pipe chain multiples operators together. Takes observable, returns transformte
        // tap - Performs Side Effects: Use it for actions that don't change the data, such as logging to the console, triggering analytics, or updating an external variable.
        tap((data) => console.log('Meal: ' + JSON.stringify(data))),
        catchError((err) => this.handleError(err)),
      )
      .subscribe({
        next: (data) => {
          this.response.set(data ?? null);
          this.item.set(data.meals?.[0] ?? null); // null when no results found
        },
        error: (data) => {
          this.apiError.set(true);
        },
      });
  }

  // DB METHODS:

  // add meal to favourites DB

 addFav(meal: Meal) {
    this.apiError.set(false);
    this.dbStatus.set('loading'); //  before the request
    const fullURL = `${this._serverURL}/meals/`;
    console.log(fullURL);
    console.log(`SEND MEAL: `);
    console.log(meal);
    this._http
      .post<Meal>(fullURL, meal)
      .pipe(catchError((err) => this.handleError(err)))
      .subscribe({
        // confirm it saved
        next: (data) => {
          this.getSavedMeals(); // ← fixed comma operator, getSavedMeals sets success itself
        },
      });
  }
  // get added meals DB

  getSavedMeals() {
    this.apiError.set(false);
    this.dbStatus.set('loading'); //  before the request

    const fullURL = `${this._serverURL}/meals`;
    this._http
      .get<Meal[]>(fullURL)
      .pipe(catchError((err) => this.handleError(err)))
      .subscribe({
        next: (data) => {
          this.savedItems.set(data);
          this.dbStatus.set('success'); //  on arrival
        },
      });
  }

  // remove meal DB
  removeFav(idMeal: string) {
    this.apiError.set(false);
    this.dbStatus.set('loading'); //  before the request

    const fullURL = `${this._serverURL}/meals/${idMeal}`;
    // You MUST subscribe
    this._http
      .delete(fullURL)
      .pipe(catchError((err) => this.handleError(err)))
      .subscribe({
        next: (data) => {
          this.getSavedMeals(); // ← removed dbStatus.set here, getSavedMeals handles it
        },
      });
  }
}
