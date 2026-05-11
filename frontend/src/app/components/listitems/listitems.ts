import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ItemsService } from '../../services/items/items.service';
import { Meal } from '../../models/meal.interface';
import {
  RouterOutlet,
  RouterLinkWithHref,
  RouterLinkActive,
} from '@angular/router';

@Component({
  selector: 'app-listitems',
  imports: [FormsModule,
    RouterOutlet, RouterLinkWithHref, RouterLinkActive
  ],
  templateUrl: './listitems.html',
  styleUrl: './listitems.css',
})
export class Listitems {
  itemsService = inject(ItemsService);

  constructor() {
    this.itemsService.getItemsUser();
  }

  id = signal<string>('');

  onSubmit() {
    this.id.set('');
  }

  //  helper to extract the first N non-empty ingredients from the Meal
  getIngredients(meal: Meal, count = 3): string[] {
    return Array.from({ length: 10 }, (_, i) => i + 1)
      .map((i) => meal[`strIngredient${i}` as keyof Meal] as string)
      .filter((ingredient) => ingredient?.trim())
      .slice(0, count);
  }
}
