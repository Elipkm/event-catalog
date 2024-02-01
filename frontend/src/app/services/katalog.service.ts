import { Injectable } from "@angular/core";
import { Quelle } from "../models/quelle.model";
import { KatalogApiService } from "./katalog-api.service";
import { Katalog } from "../models/katalog.model";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class KatalogService implements KatalogApiService {

    constructor(private http: HttpClient) {}

    updateKatalog(): Observable<any> {
        return this.http.post('http://localhost:3000/api/katalog/update', {});
    }
    getKatalog(quellen: Quelle[]): Katalog {
        throw new Error("Method not implemented.");
    }

}