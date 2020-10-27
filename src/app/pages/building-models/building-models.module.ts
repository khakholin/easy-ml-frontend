import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DragScrollModule } from 'ngx-drag-scroll';
import { NgxGraphModule } from '@swimlane/ngx-graph';

import { MaterialModule } from 'src/app/material.module';
import { BuildingModelsServiceModule } from './building-models-service.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { BuildingModelsWrapperComponent } from './components/building-models-wrapper/building-models-wrapper.component';
import { BuildingModelsSidebarComponent } from './components/building-models-sidebar/building-models-sidebar.component';
import { BuildingModelsCanvasComponent } from './components/building-models-canvas/building-models-canvas.component';

@NgModule({
    declarations: [
        BuildingModelsCanvasComponent,
        BuildingModelsSidebarComponent,
        BuildingModelsWrapperComponent,
    ],
    imports: [
        BuildingModelsServiceModule,
        CommonModule,
        DragScrollModule,
        FormsModule,
        MaterialModule,
        NgxGraphModule,
        ReactiveFormsModule,
        RouterModule,
        SharedModule,
    ],
    entryComponents: [
    ]
})
export class BuildingModelsModule { }
