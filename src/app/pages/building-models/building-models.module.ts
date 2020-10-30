import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DragScrollModule } from 'ngx-drag-scroll';

import { MaterialModule } from 'src/app/material.module';
import { BuildingModelsServiceModule } from './building-models-service.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { BuildingModelsWrapperComponent } from './components/building-models-wrapper/building-models-wrapper.component';
import { BlockInformationComponent } from './modals/block-information/block-information.component';

@NgModule({
    declarations: [
        BlockInformationComponent,
        BuildingModelsWrapperComponent,
    ],
    imports: [
        BuildingModelsServiceModule,
        CommonModule,
        DragScrollModule,
        FormsModule,
        MaterialModule,
        ReactiveFormsModule,
        RouterModule,
        SharedModule,
    ],
    entryComponents: [
    ],
})
export class BuildingModelsModule { }
