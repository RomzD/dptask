import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { matComponents } from './material-exports.model';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...matComponents
  ],
  exports: [...matComponents]
})
export class MaterialModule { }
