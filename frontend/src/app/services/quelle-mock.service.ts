import { Injectable } from "@angular/core";
import { Quelle } from "../models/quelle.model";
import { QuelleApiService } from "./quelle-api.service";
import { Observable, of } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class QuelleMockService implements QuelleApiService {

    delete(quelle: Quelle): Observable<any> {
        const index = this.quellen.findIndex((element) => element.id === quelle.id);
        if (index !== -1) {
            this.quellen.splice(index, 1);
        }
        return of(undefined);
    }

    quellen: Quelle[] = [
        {
            id: 1,
            name: 'Quelle 1',
            url: 'https://www.quelle.de',
            resolution_widht: 1920,
            resolution_height: 1080,
            anzahl_bilder: 3
        },
        {
            id: 2,
            name: 'Quelle 2',
            url: 'https://www.quelle2.de',
            resolution_widht: 600,
            resolution_height: 800,
            anzahl_bilder: 5
        }
    ];
    getQuellen(): Observable<Quelle[]> {
        return of(this.quellen);
    }

    save(quelle: Quelle): Observable<any> {
        if (quelle.id) {
            // If the element already has an ID, update existing entry
            const index = this.quellen.findIndex((e) => e.id === quelle.id);
            if (index !== -1) {
              this.quellen[index] = quelle;
            }
          } else {
            // If the element doesn't have an ID, generate one and add to the array
            quelle.id = this.generateUniqueId();
            this.quellen.push(quelle);
          }
          return of(undefined);
    }
    generateUniqueId(): number {
        const maxId = this.quellen.reduce((max, e) => (e.id > max ? e.id : max), 0);
        return maxId + 1;
    }
}