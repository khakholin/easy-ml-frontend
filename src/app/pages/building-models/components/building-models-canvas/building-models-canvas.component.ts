import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem } from '@angular/cdk/drag-drop';
import { PanningAxis } from '@swimlane/ngx-graph';

@Component({
    selector: 'app-building-models-canvas',
    templateUrl: './building-models-canvas.component.html',
    styleUrls: ['./building-models-canvas.component.scss']
})
export class BuildingModelsCanvasComponent {
    @ViewChild('line') line: ElementRef<HTMLInputElement>;
    // @Input() blocks;
    panningAxis = PanningAxis;
    connectedBlocks = { firstBlock: {} as any, secondBlock: {} as any };
    linesArray = [];
    blocks = [
        'CNN',
        'RNN',
    ];
    tree = [['test00', 'test01', 'test02', 'test03'], ['test10', 'test11'], ['test20', 'test21', 'test22', 'test23'], []];


    constructor() { }

    drop(event: CdkDragDrop<any>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            if (this.tree.find(subArr => subArr === event.previousContainer.data) && this.tree.find(subArr => subArr === event.container.data)) {
                transferArrayItem(
                    event.previousContainer.data,
                    event.container.data,
                    event.previousIndex,
                    event.currentIndex
                );
            } else {
                copyArrayItem(
                    event.previousContainer.data,
                    event.container.data,
                    event.previousIndex,
                    event.currentIndex
                );
            }
            this.tree = this.tree.filter(subArr => subArr.length);
            if (this.tree[this.tree.length - 1].length) {
                this.tree.push([]);
            }
        }
    }

    getBlockId(subArr, index) {
        let idx = -1;
        this.tree.find((item, i) => {
            if (item === subArr) {
                idx = i
                return true
            }
        })
        return `${idx}${index}`
    }

    onBlockClick(blockId) {
        if (!Object.keys(this.connectedBlocks.firstBlock).length) {
            const rect = document.getElementById(blockId).getBoundingClientRect();
            this.connectedBlocks.firstBlock = {
                top: rect.top,
                right: rect.right,
                bottom: rect.bottom,
                left: rect.left,
                width: rect.width,
                height: rect.height,
            };
        } else if (!Object.keys(this.connectedBlocks.secondBlock).length) {
            const rect = document.getElementById(blockId).getBoundingClientRect();
            this.connectedBlocks.secondBlock = {
                top: rect.top,
                right: rect.right,
                bottom: rect.bottom,
                left: rect.left,
                width: rect.width,
                height: rect.height,
            };
            if (this.connectedBlocks.firstBlock.top >= this.connectedBlocks.secondBlock.top) {
                this.connectedBlocks.firstBlock = this.connectedBlocks.secondBlock;
                this.connectedBlocks.secondBlock = {};
            }
        }

        if (Object.keys(this.connectedBlocks.firstBlock).length && Object.keys(this.connectedBlocks.secondBlock).length) {
            const x1 = this.connectedBlocks.firstBlock.left + this.connectedBlocks.firstBlock.width / 2;
            console.log(this.connectedBlocks.firstBlock, this.connectedBlocks.secondBlock);

            const y1 = this.connectedBlocks.firstBlock.top + this.connectedBlocks.firstBlock.height;
            const x2 = this.connectedBlocks.secondBlock.left + this.connectedBlocks.secondBlock.width / 2;
            const y2 = this.connectedBlocks.secondBlock.top;

            this.linesArray.push({ x1, y1, x2, y2 });
            console.log(this.linesArray);


            this.connectedBlocks.firstBlock = {};
            this.connectedBlocks.secondBlock = {};
        }
    }
}