import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ItemsService } from '../../services/items/items.service';
import { Meal } from '../../models/meal.interface';
import { RouterLinkWithHref } from '@angular/router';

import { IconBiStar } from '../icons/star.component';

@Component({
  selector: 'app-listitems',
  imports: [FormsModule, RouterLinkWithHref, IconBiStar],
  templateUrl: './listitems.html',
  styles: [],
})
export class Listitems {
  itemsService = inject(ItemsService);

  constructor() {
    this.itemsService.item.set(null); // clear detail view on home load
    this.itemsService.getItemsByName();
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
