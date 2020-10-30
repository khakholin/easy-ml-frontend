import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

import { ApiService } from 'src/app/shared/api/api.service';
import { API_PATH, BLOCKS_API_PATH } from 'src/app/shared/models/api.config';
import { BlockFormServiceModule } from '../block-form-service.module';
import { IBlock } from 'src/app/shared/models/blocks.interfaces';

@Injectable({
    providedIn: BlockFormServiceModule,
})
export class BlockFormHttpService {

    constructor(
        private _api: ApiService,
    ) { }

    getBlockById(id: string): Observable<IBlock> {
        return this._api.get(API_PATH + BLOCKS_API_PATH + `/${id}`);
    }

    createNewBlock(block: IBlock): Observable<IBlock> {
        return this._api.post(API_PATH + BLOCKS_API_PATH, block);
    }

    updateBlockById(id: string, block: IBlock): Observable<IBlock> {
        return this._api.put(API_PATH + BLOCKS_API_PATH + `/${id}`, block);
    }

    deleteBlockById(id: string): Observable<any> {
        return this._api.delete(API_PATH + BLOCKS_API_PATH + `/${id}`);
    }
}