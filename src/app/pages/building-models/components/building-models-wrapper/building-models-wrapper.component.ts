import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem } from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-building-models-wrapper',
    templateUrl: './building-models-wrapper.component.html',
    styleUrls: ['./building-models-wrapper.component.scss']
})
export class BuildingModelsWrapperComponent {
    isSidebarShown: boolean;
    headerButtons = ['burger'];
    connectedBlocks = { firstBlock: {} as any, secondBlock: {} as any };

    linesArrayStatus = true;
    linesArray = [];
    idIterator = this.IdGenerator();

    sidebarBlocks = [
        {
            blockType: 'CNN',
        },
        {
            blockType: 'RNN',
        },
    ];

    canvasBlocks = [[{ blockType: 'test' }], []];

    constructor() { }

    onBurgerClick(event: boolean): void {
        this.isSidebarShown = event;

        this.linesArrayStatus = false;
        setTimeout(() => {
            this.linesRewrite();
            this.linesArrayStatus = true;
        }, 500);
    }

    drop(event: CdkDragDrop<any>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            if (this.canvasBlocks.find(subArr => subArr === event.previousContainer.data) && this.canvasBlocks.find(subArr => subArr === event.container.data)) {
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
            this.canvasBlocks = this.canvasBlocks.filter(subArr => subArr.length);
            if (this.canvasBlocks[this.canvasBlocks.length - 1].length) {
                this.canvasBlocks.push([]);
            }

            this.linesArrayStatus = false;
            setTimeout(() => {
                this.linesRewrite();
                this.linesArrayStatus = true;
            }, 500);
        }
    }

    getBlockId(subArr, index) {
        let idx = -1;
        this.canvasBlocks.find((item, i) => {
            if (item === subArr) {
                idx = i
                return true
            }
        })
        return `${idx}${index}`
    }

    *IdGenerator() {
        let id = 0;
        while (true) {
            yield ++id;
        }
    }


    linesRewrite() {
        this.linesArray = this.linesArray?.map((line) => {
            const rectFirstBlock = document.getElementById(line.firstBlockId).getBoundingClientRect();
            const rectSecondBlock = document.getElementById(line.secondBlockId).getBoundingClientRect();

            const x1 = rectFirstBlock.left + rectFirstBlock.width / 2;
            const y1 = rectFirstBlock.top + rectFirstBlock.height;
            const x2 = rectSecondBlock.left + rectSecondBlock.width / 2;
            const y2 = rectSecondBlock.top;
            console.log({ ...line, x1, y1, x2, y2 });

            return { ...line, x1, y1, x2, y2 };

        });
    }

    onBlockClick(blockId) {
        if (!Object.keys(this.connectedBlocks.firstBlock).length) {
            const rect = document.getElementById(blockId).getBoundingClientRect();
            this.connectedBlocks.firstBlock = {
                blockId,
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
                blockId,
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
            const y1 = this.connectedBlocks.firstBlock.top + this.connectedBlocks.firstBlock.height;
            const x2 = this.connectedBlocks.secondBlock.left + this.connectedBlocks.secondBlock.width / 2;
            const y2 = this.connectedBlocks.secondBlock.top;

            this.linesArray.push({ id: this.idIterator.next().value, firstBlockId: this.connectedBlocks.firstBlock.blockId, secondBlockId: this.connectedBlocks.secondBlock.blockId, x1, y1, x2, y2 });
            console.log(this.linesArray);


            this.connectedBlocks.firstBlock = {};
            this.connectedBlocks.secondBlock = {};
        }
    }
}