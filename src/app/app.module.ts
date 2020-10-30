import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { BuildingModelsModule } from './pages/building-models/building-models.module';
import { BusinessLayoutModule } from './layouts/business-layout/business-layout.module';
import { SharedModule } from './shared/shared.module';
import { BlockFormModule } from './pages/block-form/block-form.module';
import { SettingsHttpService } from './shared/services/settings.http.service';

export function app_Init(settingsHttpService: SettingsHttpService) {
  return () => settingsHttpService.initializeApp();
}

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
  providers: [
    { provide: APP_INITIALIZER, useFactory: app_Init, deps: [SettingsHttpService], multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
