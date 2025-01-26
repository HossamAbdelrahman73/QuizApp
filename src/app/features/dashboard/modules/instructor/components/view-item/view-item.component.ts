import { Component, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-item',
  templateUrl: './view-item.component.html',
  styleUrl: './view-item.component.scss'
})
export class ViewItemComponent {
  readonly dialogRef = inject(MatDialogRef<ViewItemComponent>);
  readonly data = inject(MAT_DIALOG_DATA);
  ngOnInit(): void {
console.log(this.data);

  }
}
