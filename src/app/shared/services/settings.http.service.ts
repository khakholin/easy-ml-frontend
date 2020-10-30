import { Injectable, isDevMode } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { SettingsService } from "./settings.service";
import { Settings } from '../models/settings';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SettingsHttpService {

    constructor(private http: HttpClient, private settingsService: SettingsService) {
    }

    initializeApp(): Promise<any> {
        return new Promise(
            (resolve) => {
                if (isDevMode()) {
                    of({})
                        .pipe(
                            tap(
                                () => {
                                    this.settingsService.settings = <Settings>{ apiUrl: process.env.API_URL };
                                    resolve();
                                }
                            )
                        )
                        .toPromise()
                } else {
                    this.http.get('assets/settings.json')
                        .toPromise()
                        .then(response => {
                            this.settingsService.settings = <Settings>response;
                            resolve();
                        }
                        )
                }
            }
        )
    }
}