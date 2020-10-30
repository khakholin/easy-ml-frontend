import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BlockFormHttpService } from '../../services/block-form-http.service';
import { IBlock, Property } from 'src/app/shared/models/blocks.interfaces';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from 'src/app/shared/components/confirmation-modal/confirmation-modal.component';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-block-form-wrapper',
    templateUrl: './block-form-wrapper.component.html',
    styleUrls: ['./block-form-wrapper.component.scss']
})
export class BlockFormWrapperComponent implements OnInit {
    private _sub: Subscription = new Subscription;

    block: IBlock;
    blockId: string;
    headerButtons: string[] = ['arrow_back']

    constructor(
        private _blockFormHttp: BlockFormHttpService,
        private _route: ActivatedRoute,
        private _router: Router,
        public dialog: MatDialog,
    ) { }

    ngOnInit(): void {
        this._route.params
            .subscribe(
                (params: Params) => {
                    if (params['id']) {
                        this.blockId = params['id'];
                        this._blockFormHttp.getBlockById(params['id'])
                            .subscribe(
                                (response: IBlock) => {
                                    this.block = { blockType: response.blockType, properties: response.properties };
                                },
                                (err) => {
                                    this._router.navigate(['/building-models']);
                                }
                            )
                    } else {
                        this.block = { blockType: '', properties: [] };
                    }
                }
            )
    }

    onActionClick(event): void {
        if (event) {
            this._router.navigate(['/building-models']);
        }
    }

    onPropertyAddClick(): void {
        this.block.properties.push(new Property);
    }

    onPropertyDeleteClick(index: number): void {
        const dialogRef = this.dialog.open(ConfirmationModalComponent, {
            data: {
                title: 'Удаление свойства',
                body: `Вы действительно хотите удалить свойство${this.block?.properties[index]?.name ? ' "' + this.block?.properties[index]?.name + '"' : ''}?`,
            }
        });

        this._sub.add(
            dialogRef.afterClosed()
                .subscribe(
                    (action: boolean) => {
                        if (action) {
                            this.block.properties.splice(index, 1);
                        }
                    }
                )
        );
    }

    onSave(): void {
        if (this.blockId) {
            this._blockFormHttp.updateBlockById(this.blockId, { ...this.block, properties: this.block.properties.filter(property => property.name.length && property.alias.length && property.default.toString().length), })
                .subscribe(
                    req => {
                        this._router.navigate(['/building-models']);
                    }
                )
        } else {
            this._blockFormHttp.createNewBlock({ ...this.block, properties: this.block.properties.filter(property => property.name.length && property.alias.length && property.default.toString().length), })
                .subscribe(
                    req => {
                        this._router.navigate(['/building-models']);
                    },
                    err => {
                        this._router.navigate(['/building-models']);
                    }
                )
        }
    }

    onDelete(): void {
        const dialogRef = this.dialog.open(ConfirmationModalComponent, {
            data: {
                title: 'Удаление блока',
                body: `Вы действительно хотите удалить блок${this.block?.blockType ? ' "' + this.block?.blockType + '"' : ''}?`,
            }
        });

        this._sub.add(
            dialogRef.afterClosed()
                .subscribe(
                    (action: boolean) => {
                        if (action) {
                            this._blockFormHttp.deleteBlockById(this.blockId)
                                .subscribe(
                                    req => {
                                        this._router.navigate(['/building-models']);
                                    },
                                    err => {
                                        this._router.navigate(['/building-models']);
                                    }
                                )
                        }
                    }
                )
        );
    }
}