import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { BusinessLayoutWrapperComponent } from './components/business-layout-wrapper/business-layout-wrapper.component';

@NgModule({
    exports: [
        BusinessLayoutWrapperComponent
    ],
    declarations: [
        BusinessLayoutWrapperComponent
    ],
    imports: [
        AppRoutingModule,
        CommonModule,
    ],
    entryComponents: [
    ]
})
export class BusinessLayoutModule { }
