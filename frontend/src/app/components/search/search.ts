import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ItemsService } from '../../services/items/items.service';

@Component({
  selector: 'app-search',
  imports: [FormsModule],
  templateUrl: './search.html',
  styles: [],
})
export class Search {
  itemsService = inject(ItemsService);
}
