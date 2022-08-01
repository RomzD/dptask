import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadBooks, addBook } from './state/book/book.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  constructor(private readonly store: Store) {
  }

  ngOnInit(): void {
    this.store.dispatch(loadBooks());
  }



}
