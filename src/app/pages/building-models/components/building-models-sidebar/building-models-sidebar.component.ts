import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-building-models-sidebar',
    templateUrl: './building-models-sidebar.component.html',
    styleUrls: ['./building-models-sidebar.component.scss']
})
export class BuildingModelsSidebarComponent {
    @Input() isShown: boolean;
    @Input() blocks;

    constructor() { }
}