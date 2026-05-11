import { Routes } from '@angular/router';
import { Home } from './routes/home/home';
import { About } from './routes/about/about';
import { Alphabet } from './routes/alphabet/alphabet';
import { Listitems } from './components/listitems/listitems';
import { Favourite } from './routes/favourite/favourite';

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
    title: 'Meal By Letter',
  },
  {
    path: 'meal/:id',
    component: Listitems,
    title: 'Meal',
  },
  {
    path: 'favourites',
    component: Favourite,
    title: 'My Favourites',
  },
];
