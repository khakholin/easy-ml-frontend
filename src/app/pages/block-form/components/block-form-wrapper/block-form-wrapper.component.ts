import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-block-form-wrapper',
    templateUrl: './block-form-wrapper.component.html',
    styleUrls: ['./block-form-wrapper.component.scss']
})
export class BlockFormWrapperComponent {
    headerButtons: string[] = ['arrow_back']
    blockType: string;

    constructor(
        private _router: Router,
    ) { }

    onActionClick(event): void {
        if (event) {
            this._router.navigate(['/building-models']);
        }
    }
}