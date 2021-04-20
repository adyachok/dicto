import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-word-dialog',
  templateUrl: './delete-word-dialog.component.html',
  styleUrls: ['./delete-word-dialog.component.css']
})
export class DeleteWordDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteWordDialogComponent>) { }

  closeDialog() {
    this.dialogRef.close('Pizza!');
  }

  ngOnInit(): void {
  }

}
