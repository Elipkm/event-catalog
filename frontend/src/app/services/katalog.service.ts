import { Injectable } from "@angular/core";
import { Quelle } from "../models/quelle.model";
import { KatalogApiService } from "./katalog-api.service";
import { Katalog } from "../models/katalog.model";

@Injectable({
    providedIn: 'root',
})
export class KatalogService implements KatalogApiService {
    updateKatalog(quellen: Quelle[]): void {
        throw new Error("Method not implemented.");
    }
    getKatalog(quellen: Quelle[]): Katalog {
        throw new Error("Method not implemented.");
    }

}