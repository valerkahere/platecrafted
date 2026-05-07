import { Component } from '@angular/core';
import { Additem } from '../../components/additem/additem';
import { Listitems } from '../../components/listitems/listitems';

@Component({
  selector: 'app-home',
  imports: [
    Additem, Listitems
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
