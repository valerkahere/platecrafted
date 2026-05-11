import { Component, inject } from '@angular/core';
import { IconBiStarFill } from '../../components/icons/star-fill.component';

import { RouterLink } from '@angular/router';
import { ItemsService } from '../../services/items/items.service';
import { Meal } from '../../models/meal.interface';
@Component({
  selector: 'app-favourite',
  imports: [IconBiStarFill, RouterLink],
  templateUrl: './favourite.html',
  styles: ``,
})
export class Favourite {
   itemsService = inject(ItemsService);

  constructor() {
    this.itemsService.getSavedMeals();
  }

  getIngredients(meal: Meal, count = 3): string[] {
    return Array.from({ length: 10 }, (_, i) => i + 1)
      .map(i => meal[`strIngredient${i}` as keyof Meal] as string)
      .filter(ingredient => ingredient?.trim())
      .slice(0, count);
  }
}

