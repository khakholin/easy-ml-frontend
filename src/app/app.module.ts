import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { BuildingModelsModule } from './pages/building-models/building-models.module';
import { BusinessLayoutModule } from './layouts/business-layout/business-layout.module';
import { SharedModule } from './shared/shared.module';
import { BlockFormModule } from './pages/block-form/block-form.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    BlockFormModule,
    BrowserAnimationsModule,
    BrowserModule,
    BuildingModelsModule,
    BusinessLayoutModule,
    MaterialModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
