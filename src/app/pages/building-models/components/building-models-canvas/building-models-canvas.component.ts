import { Component, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem } from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-building-models-canvas',
    templateUrl: './building-models-canvas.component.html',
    styleUrls: ['./building-models-canvas.component.scss']
})
export class BuildingModelsCanvasComponent {
    // @Input() blocks;

    blocks = [
        'CNN',
        'RNN',
    ];

    tree = [['test0', 'test01'], ['test1']];


    constructor() { }

    drop(event: CdkDragDrop<any>, listName: string) {
        console.log(event);

        if (event.previousContainer === event.container) {
            if (listName === 'blocks') {
                moveItemInArray(event.container.data, event.previousIndex, event.previousIndex);
            } else {
                // let prev;
                // let curr;
                // let searched;
                // this.tree.map((subArr, index, arr) => {
                //     if (arr[index+1]){
                //         if((arr.length -1) * index >= event.previousIndex && (arr[index+1].length - 1) * (index + 1)){

                //         }
                //     } else {
                //         searched = subArr;
                //     }
                // })

                // console.log(event.previousIndex, event.currentIndex);

                moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
            }
        } else {
            copyArrayItem(
                event.previousContainer.data,
                event.container.data[0],
                event.previousIndex,
                event.currentIndex);
        }
    }
}