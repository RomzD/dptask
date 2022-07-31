import { Component } from '@angular/core';
import { BOOK_MOCK } from './book/book.component.mock';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  bookMock = BOOK_MOCK;
  title = 'book-list';
}
