import { Routes } from '@angular/router';
import { Home } from './routes/home/home';
import { About } from './routes/about/about';

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
];
