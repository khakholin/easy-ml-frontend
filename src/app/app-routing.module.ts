import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BusinessLayoutWrapperComponent } from './layouts/business-layout/components/business-layout-wrapper/business-layout-wrapper.component';
import { BuildingModelsWrapperComponent } from './pages/building-models/components/building-models-wrapper/building-models-wrapper.component';
import { BlockFormWrapperComponent } from './pages/block-form/components/block-form-wrapper/block-form-wrapper.component';


const routes: Routes = [
  {
    path: '',
    component: BusinessLayoutWrapperComponent,
    children: [
      {
        path: 'building-models',
        component: BuildingModelsWrapperComponent,
      },
      {
        path: 'block-form',
        component: BlockFormWrapperComponent,
      },
      {
        path: 'block-form/:id',
        component: BlockFormWrapperComponent,
      },
      {
        path: '**',
        redirectTo: 'building-models',
        pathMatch: 'full',
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
