import { Component, inject } from '@angular/core';
import { ItemsService } from '../../services/items/items.service';
import { Listitems } from '../../components/listitems/listitems';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-alphabet',
  templateUrl: './alphabet.html',
  styleUrl: './alphabet.css',
  imports: [Listitems, NgClass]
})
export class Alphabet {
  itemsService = inject(ItemsService);

  letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
  selectedLetter = 'a';

  selectLetter(letter: string) {
    this.selectedLetter = letter;
    this.itemsService.getItemsByLetter(letter);
  }
}
