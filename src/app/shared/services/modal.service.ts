import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(
    private readonly dialog: MatDialog
  ) { }

  openDailog<T, R>(component: ComponentType<T>, data?: R): MatDialogRef<T>{
    return this.dialog.open(component, { data });
  }
}
