import { Component } from '@angular/core';
import { Additem } from '../../components/additem/additem';
import { Listitems } from '../../components/listitems/listitems';
import { Search } from '../../components/search/search';

@Component({
  selector: 'app-home',
  imports: [Additem, Listitems, Search],
  templateUrl: './home.html',
  styles: [],
})
export class Home {}
