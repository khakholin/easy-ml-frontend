import { Component, HostListener, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem } from '@angular/cdk/drag-drop';
import 'leader-line';
import { BuildingModelsHttpService } from '../../services/building-models-http.service';
import { IBlock } from 'src/app/shared/models/blocks.interfaces';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ConfirmationModalComponent } from 'src/app/shared/components/confirmation-modal/confirmation-modal.component';
import { BlockInformationComponent } from '../../modals/block-information/block-information.component';

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

    private _sub: Subscription = new Subscription;
    canvasBlocks = [[]];
    connectedBlocks = { firstBlock: {} as any, secondBlock: {} as any };
    headerButtons = ['burger'];
    idIterator = this.IdGenerator();
    isSidebarShown: boolean;
    linesArray = [];
    linesArrayStatus = true;
    sidebarBlocks: IBlock[];

    constructor(
        private _buildingModelsHttp: BuildingModelsHttpService,
        public dialog: MatDialog,
    ) { }

    ngOnInit(): void {
        this.idIterator = this.IdGenerator();
        this._buildingModelsHttp.getAllBlocks()
            .subscribe(
                (res: IBlock[]) => {
                    this.sidebarBlocks = res;
                },
                (err) => console.warn(err)
            )
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

    onBlockModelEdit(subArrIndex: number, itemIndex: number) {
        event.stopPropagation();

        const dialogRef = this.dialog.open(BlockInformationComponent, {
            data: {
                title: 'Изменение параметров блока',
                block: this.canvasBlocks[subArrIndex][itemIndex],
            }
        });

        this._sub.add(
            dialogRef.afterClosed()
                .subscribe(
                    editedBlock => {
                        if (editedBlock) {
                            this.canvasBlocks[subArrIndex][itemIndex] = {
                                ...this.canvasBlocks[subArrIndex][itemIndex],
                                properties: editedBlock.properties.filter(property => property.name.length && property.alias.length && property.default.toString().length),
                            }
                        }
                    }
                )
        );
    }

    onBlockDeleteFromModel(subArrIndex: number, itemIndex: number, blockId: string) {
        event.stopPropagation();

        const dialogRef = this.dialog.open(ConfirmationModalComponent, {
            data: {
                title: 'Удаление блока из модели',
                body: `Вы действительно хотите удалить из модели блок${this.canvasBlocks[subArrIndex][itemIndex]?.blockType ? ' "' + this.canvasBlocks[subArrIndex][itemIndex]?.blockType + '"' : ''}?`,
            }
        });

        this._sub.add(
            dialogRef.afterClosed()
                .subscribe(
                    (action: boolean) => {
                        if (action) {
                            this.linesArray.map(line => {
                                if (line.firstBlockId === blockId || line.secondBlockId === blockId) {
                                    line.line.remove();
                                }
                            });
                            this.linesArray = this.linesArray.filter(line => line.firstBlockId !== blockId && line.secondBlockId === blockId);
                            this.canvasBlocks[subArrIndex].splice(itemIndex, 1);
                            if (!this.canvasBlocks[subArrIndex].length && subArrIndex !== this.canvasBlocks.length - 1) {
                                this.canvasBlocks.splice(subArrIndex, 1);
                            }
                        }
                    }
                )
        );
    }

    getBlockIndex(subArrIndex: number, itemIndex: number) {
        let totalLength = 0;
        for (let i = 0; i < subArrIndex; i++) {
            totalLength += this.canvasBlocks[i].length;
        }

        return totalLength + itemIndex;
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
        console.log(this.linesArray);

        this.linesArray = this.linesArray?.map((line) => {
            line.line.remove();
            if (document.getElementById(line.firstBlockId).getBoundingClientRect().top < document.getElementById(line.secondBlockId).getBoundingClientRect().top) {
                const newLine = new LeaderLine(
                    document.getElementById(line.firstBlockId),
                    document.getElementById(line.secondBlockId)
                );
                newLine.color = this.getRandomColor();
                newLine.size = 2;
                newLine.path = 'arc'
                newLine.setOptions({ startSocket: 'bottom', endSocket: 'top' });
                return { ...line, line: newLine, lineColor: newLine.color };
            } else {
                return null
            }
        }).filter(line => line);

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
        }

        if (this.connectedBlocks.firstBlock.top >= this.connectedBlocks.secondBlock.top) {
            this.connectedBlocks.firstBlock = {};
            this.connectedBlocks.secondBlock = {};
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

            this.linesArray.push({ firstBlockId: this.connectedBlocks.firstBlock.blockId, secondBlockId: this.connectedBlocks.secondBlock.blockId, line, lineColor: line.color });
            this.connectedBlocks.firstBlock = {};
            this.connectedBlocks.secondBlock = {};
        }
    }

    removeLastLine() {
        this.linesArray[this.linesArray.length - 1].line.remove();
        this.linesArray.pop();
    }

    onBlockDelete(event, id: string): void {
        event.stopPropagation();

        const dialogRef = this.dialog.open(ConfirmationModalComponent, {
            data: {
                title: 'Удаление блока',
                body: `Вы действительно хотите удалить блок${this.sidebarBlocks[id]?.blockType ? ' "' + this.sidebarBlocks[id]?.blockType + '"' : ''}?`,
            }
        });

        this._sub.add(
            dialogRef.afterClosed()
                .subscribe(
                    (action: boolean) => {
                        if (action) {
                            this._buildingModelsHttp.deleteBlockById(id)
                                .subscribe(
                                    req => {
                                        this._buildingModelsHttp.getAllBlocks()
                                            .subscribe(
                                                (res: IBlock[]) => {
                                                    this.sidebarBlocks = res;
                                                },
                                                (err) => console.warn(err)
                                            )
                                    },
                                    err => {
                                        console.warn(err)
                                    }
                                )
                        }
                    }
                )
        );
    }
}