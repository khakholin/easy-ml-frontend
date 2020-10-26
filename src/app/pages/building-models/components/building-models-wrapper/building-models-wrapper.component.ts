import { Component } from '@angular/core';

@Component({
    selector: 'app-building-models-wrapper',
    templateUrl: './building-models-wrapper.component.html',
    styleUrls: ['./building-models-wrapper.component.scss']
})
export class BuildingModelsWrapperComponent {
    isSidebarShown: boolean;
    headerButtons = ['burger'];;

    sidebarBlocks = [
        {
            blockType: 'CNN',
        },
        {
            blockType: 'CNN',
        },
        {
            blockType: 'CNN',
        },
        {
            blockType: 'CNN',
        },
        {
            blockType: 'CNN',
        },
        {
            blockType: 'CNN',
        },
        {
            blockType: 'CNN',
        },
        {
            blockType: 'CNN',
        },
        {
            blockType: 'CNN',
        },
        {
            blockType: 'CNN',
        },
        {
            blockType: 'CNN',
        },
        {
            blockType: 'CNN',
        },
    ];

    canvasBlocks = [];

    constructor() { }

    onBurgerClick(event: boolean): void {
        this.isSidebarShown = event;
    }
}