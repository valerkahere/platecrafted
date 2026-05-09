import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ItemsService } from '../../services/items/items.service';

@Component({
  selector: 'app-search',
  imports: [FormsModule],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {
  itemsService = inject(ItemsService);
}
