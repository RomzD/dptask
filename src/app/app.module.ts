import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BookComponent } from './components/book/book.component';
import { MaterialModule } from './material/material.module';
import { bookRecuder } from './state/book/book.reducer';
import { EffectsModule } from '@ngrx/effects';
import { BookListEffectsService } from './shared/services/book-list-effects.service';
import { BookEffectsService } from './shared/services/book-effects.service';
import { BookModalComponent } from './components/book-modal/book-modal.component';
import { ModalDirectiveDirective } from './directives/modal/modal-directive.directive';
import { BookListComponent } from './components/book-list/book-list/book-list.component';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';



@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    BookModalComponent,
    ModalDirectiveDirective,
    BookListComponent,
    ConfirmationModalComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    StoreModule.forRoot({ book: bookRecuder }),
    EffectsModule.forRoot([BookListEffectsService, BookEffectsService]),
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
