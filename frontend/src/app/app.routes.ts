import { Routes } from '@angular/router';
import { Home } from './routes/home/home';
import { About } from './routes/about/about';
import { Alphabet } from './routes/alphabet/alphabet';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'Platecrafted',
  },
  {
    path: 'about',
    component: About,
    title: 'About Platecrafted',
  },
  {
    path: 'alphabet',
    component: Alphabet,
    title: 'Meal By Letter'
  }
];
