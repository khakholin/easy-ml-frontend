import { Component, HostListener, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem } from '@angular/cdk/drag-drop';
import 'leader-line';
import { DragScrollComponent } from 'ngx-drag-scroll';
declare let LeaderLine: any;

@Component({
    selector: 'app-building-models-wrapper',
    templateUrl: './building-models-wrapper.component.html',
    styleUrls: ['./building-models-wrapper.component.scss']
})
export class BuildingModelsWrapperComponent implements OnInit {
    @HostListener('window:resize', [])
    onResize() {
        this.linesRewrite();
    }


    @ViewChild('drg', { read: DragScrollComponent }) ds: DragScrollComponent;

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

    canvasBlocks = [[]];

    constructor() { }

    ngOnInit(): void {
        this.idIterator = this.IdGenerator();
    }

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

            this.canvasBlocks = this.canvasBlocks.filter(subArr => subArr.length).map(subArr => {
                return subArr.map(elem => {
                    return elem.id ? elem : { ...elem, id: this.idIterator.next().value }
                });
            });

            if (this.canvasBlocks[this.canvasBlocks.length - 1].length) {
                this.canvasBlocks.push([]);
            }
        }

        this.linesArrayStatus = false;
        setTimeout(() => {
            this.linesRewrite();
            this.linesArrayStatus = true;
        }, 500);
    }

    *IdGenerator() {
        let id = 0;
        while (true) {
            yield ++id;
        }
    }

    getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    linesRewrite() {
        this.linesArray = this.linesArray?.map((line) => {
            line.line.remove();
            const newLine = new LeaderLine(
                document.getElementById(line.firstBlockId),
                document.getElementById(line.secondBlockId)
            );
            newLine.color = this.getRandomColor();
            newLine.size = 2;
            newLine.path = 'arc'
            newLine.setOptions({ startSocket: 'bottom', endSocket: 'top' });

            // const rectFirstBlock = document.getElementById(line.firstBlockId).getBoundingClientRect();
            // const rectSecondBlock = document.getElementById(line.secondBlockId).getBoundingClientRect();

            // const x1 = rectFirstBlock.left + rectFirstBlock.width / 2;
            // const y1 = rectFirstBlock.top + rectFirstBlock.height;
            // const x2 = rectSecondBlock.left + rectSecondBlock.width / 2;
            // const y2 = rectSecondBlock.top;
            return { ...line, line: newLine, lineColor: newLine.color };
        });
    }

    onBlockHover(blockId) {
        this.linesArray.map(line => {
            if (line.firstBlockId === blockId) {
                const curColor = this.hexToRgb(line.lineColor);
                document.getElementById(line.secondBlockId).style.backgroundColor = `rgba(${curColor.r},${curColor.g},${curColor.b},0.2)`;
                line.line.setOptions({ dash: { animation: true } });
            }
        });
    }

    onMouseOut(blockId) {
        this.linesArray.map(line => {
            if (line.firstBlockId === blockId) {
                document.getElementById(line.secondBlockId).style.backgroundColor = 'white';
                line.line.setOptions({ dash: false });
            }
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
            const line = new LeaderLine(
                document.getElementById(this.connectedBlocks.firstBlock.blockId),
                document.getElementById(this.connectedBlocks.secondBlock.blockId)
            );

            line.color = this.getRandomColor();
            line.size = 2;
            line.path = 'arc'
            line.setOptions({ startSocket: 'bottom', endSocket: 'top' });

            // const x1 = this.connectedBlocks.firstBlock.left + this.connectedBlocks.firstBlock.width / 2;
            // const y1 = this.connectedBlocks.firstBlock.top + this.connectedBlocks.firstBlock.height;
            // const x2 = this.connectedBlocks.secondBlock.left + this.connectedBlocks.secondBlock.width / 2;
            // const y2 = this.connectedBlocks.secondBlock.top - 2;

            this.linesArray.push({ firstBlockId: this.connectedBlocks.firstBlock.blockId, secondBlockId: this.connectedBlocks.secondBlock.blockId, line, lineColor: line.color });
            this.connectedBlocks.firstBlock = {};
            this.connectedBlocks.secondBlock = {};
        }
    }
}