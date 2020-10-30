import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { BusinessHeaderComponent } from './components/business-header/business-header.component';
import { MaterialModule } from '../material.module';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';


@NgModule({
    declarations: [
        BusinessHeaderComponent,
        ConfirmationModalComponent,
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        MaterialModule,
        RouterModule,
    ],
    exports: [
        BusinessHeaderComponent,
        ConfirmationModalComponent,
    ],
    providers: [
    ]
})
export class SharedModule { }
