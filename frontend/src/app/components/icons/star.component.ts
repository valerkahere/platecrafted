import { Component } from '@angular/core';
// To let Tailwind (or any CSS) control the size, change the attributes in your component template to 100% (WIDTH, HEIGHT). This tells the SVG to "fill the container," and the container's size is what your Tailwind h-8 class is actually targeting.
// If the icon still looks tiny inside a big box after this change, add display: block or display: inline-block to the component's styles. By default, custom elements are display: inline, which sometimes causes them to ignore height/width commands.
@Component({
  selector: 'bi:star',
  standalone: true,
  template: `<svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    viewBox="0 0 16 16"
  >
    <path
      fill="currentColor"
      d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256l4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73l3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356l-.83 4.73zm4.905-2.767l-3.686 1.894l.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575l-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957l-3.686-1.894a.5.5 0 0 0-.461 0z"
    />
  </svg>`,
  styles: [':host {display: inline-block;}'],
})
export class IconBiStar {}
