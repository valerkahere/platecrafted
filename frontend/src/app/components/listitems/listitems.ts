import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ItemsService } from '../../services/items/items.service';

@Component({
  selector: 'app-listitems',
  imports: [FormsModule],
  templateUrl: './listitems.html',
  styleUrl: './listitems.css',
})
export class Listitems {
  itemsService = inject(ItemsService);

  constructor() {
    this.itemsService.getItems();
  }

  id = signal<string>('');
  onSubmit() {
    // 1. Send data to service
    //this.itemsService.deleteItem(this.id());
    // 2. Clear the form signals
    this.id.set('');
  }
}
