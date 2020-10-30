import { Injectable, isDevMode } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SettingsService } from '../services/settings.service';

@Injectable({
    providedIn: 'root',
})
export class ApiService {

    constructor(
        private _http: HttpClient,
        private _settings: SettingsService,
    ) { }

    delete(url: string, headers?: any): Observable<any> {
        return this._http.delete<any>(this._settings.settings.apiUrl + url, { headers });
    }

    get(url: string, headers?: any): Observable<any> {
        return this._http.get<any>(this._settings.settings.apiUrl + url, { headers });
    }

    post(url: string, params: any, headers?: any): Observable<any> {
        return this._http.post<any>(this._settings.settings.apiUrl + url, params, { headers });
    }

    put(url: string, params: any, headers?: any): Observable<any> {
        return this._http.put<any>(this._settings.settings.apiUrl + url, params, { headers });
    }

    linkCompilation(url: string): string {
        return this._settings.settings.apiUrl + url;
    }
}