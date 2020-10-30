import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

import { ApiService } from 'src/app/shared/api/api.service';
import { API_PATH, BLOCKS_API_PATH } from 'src/app/shared/models/api.config';
import { BuildingModelsServiceModule } from '../building-models-service.module';
import { IBlock } from 'src/app/shared/models/blocks.interfaces';

@Injectable({
    providedIn: BuildingModelsServiceModule,
})
export class BuildingModelsHttpService {

    constructor(
        private _api: ApiService,
    ) { }

    getAllBlocks(): Observable<IBlock[]> {
        return this._api.get(API_PATH + BLOCKS_API_PATH);
    }

    deleteBlockById(id: string): Observable<any> {
        return this._api.delete(API_PATH + BLOCKS_API_PATH + `/${id}`);
    }
}