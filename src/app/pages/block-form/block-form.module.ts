import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { BlockFormServiceModule } from './block-form-service.module';
import { BlockFormWrapperComponent } from './components/block-form-wrapper/block-form-wrapper.component';

@NgModule({
    declarations: [
        BlockFormWrapperComponent,
    ],
    imports: [
        BlockFormServiceModule,
        CommonModule,
        FormsModule,
        MaterialModule,
        ReactiveFormsModule,
        RouterModule,
        SharedModule,
    ],
    entryComponents: [
    ]
})
export class BlockFormModule { }
