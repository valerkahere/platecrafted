import { Component, signal } from '@angular/core';
import {
  RouterOutlet,
  RouterLinkWithHref,
  RouterLinkActive,
} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLinkWithHref, RouterLinkActive],
  templateUrl: './app.html',
  styles: [],
})
export class App {
  protected readonly title = signal('movie-collection');
}
