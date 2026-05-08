import { Component, inject, signal } from '@angular/core';
import { Itemsapi } from '../../services/itemsapi/itemsapi';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listitems',
  imports: [FormsModule],
  templateUrl: './listitems.html',
  styleUrl: './listitems.css',
})
export class Listitems {
  movieService = inject(Itemsapi);

  constructor() {
    this.movieService.getItems();
  }

  id = signal<string>('');
  onSubmit() {
    // 1. Send data to service
    this.movieService.deleteItem(this.id());
    // 2. Clear the form signals
    this.id.set('');
  }
}
