import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BookComponent } from './book/book.component';
import { MaterialModule } from './material/material.module';
import { bookRecuder } from './state/book/book.reducer';
import { booksRecuder } from './state/books/book-list.reducer';
import { EffectsModule } from '@ngrx/effects';
import { BookEffectsService } from './shared/services/book-effects.service';

@NgModule({
  declarations: [
    AppComponent,
    BookComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    StoreModule.forRoot({ book: bookRecuder, books: booksRecuder }),
    EffectsModule.forRoot([BookEffectsService]),
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
