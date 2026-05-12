import { Component } from '@angular/core';
import { Listitems } from '../../components/listitems/listitems';
import { Search } from '../../components/search/search';

@Component({
  selector: 'app-home',
  imports: [ Listitems, Search],
  templateUrl: './home.html',
  styles: [],
})
export class Home {}
