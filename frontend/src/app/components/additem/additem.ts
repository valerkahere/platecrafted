import { Component, inject, Signal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ItemsService } from '../../services/items/items.service';
@Component({
  selector: 'app-additem',
  imports: [FormsModule],
  templateUrl: './additem.html',
  styleUrl: './additem.css',
})
export class Additem {
  itemsService = inject(ItemsService);

  title = signal<string>('');
  year = signal<number | null>(null);
  poster = signal<string>('');

  onSubmit() {
    // 1. Send data to service
    // this.itemsService.addItem(
    //   this.title(),
    //   this.year(),
    //   this.poster(),
    // );
    // 2. Clear the form signals
    this.title.set('');
    this.year.set(null);
    this.poster.set('');
  }
}
