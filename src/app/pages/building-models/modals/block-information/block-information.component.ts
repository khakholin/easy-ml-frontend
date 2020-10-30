import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IBlock, Property } from 'src/app/shared/models/blocks.interfaces';

@Component({
  selector: 'app-block-information',
  templateUrl: './block-information.component.html',
  styleUrls: ['./block-information.component.scss']
})
export class BlockInformationComponent implements OnInit {
  currentData: IBlock;

  constructor(
    public dialogRef: MatDialogRef<BlockInformationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    if (this.data?.block) {
      this.currentData = JSON.parse(JSON.stringify(this.data.block));
    }
  }

  onClose() {
    this.dialogRef.close()
  }

  onPropertyAddClick() {
    this.currentData.properties.push(new Property);
  }

  onPropertyDeleteClick(index: number) {
    this.currentData.properties.splice(index, 1);
  }
}
