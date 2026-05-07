import { Component, inject, Signal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Itemsapi } from '../../services/itemsapi/itemsapi';


@Component({
  selector: 'app-additem',
  imports: [FormsModule],
  templateUrl: './additem.html',
  styleUrl: './additem.css',
})
export class Additem {
    movieService = inject(Itemsapi);

    title = signal<string>("");
    year = signal<number | null>(null);
    poster = signal<string>("");

    onSubmit() {
        // 1. Send data to service
        this.movieService.addItem(
            this.title(), this.year(), this.poster()
        );
        // 2. Clear the form signals
        this.title.set("");
        this.year.set(null);
        this.poster.set("");
    }
}
