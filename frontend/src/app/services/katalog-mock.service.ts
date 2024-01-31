import { Katalog } from "../models/katalog.model";
import { Quelle } from "../models/quelle.model";
import { KatalogApiService } from "./katalog-api.service";

export class KatalogMockService implements KatalogApiService {

    updateKatalog(quellen: Quelle[]): void {
        throw new Error("Method not implemented.");
    }
    getKatalog(quellen: Quelle[]): Katalog {
        let katalog: Katalog = {
            id: 0,
            date: new Date(),
            bilderQuellen: []
        };
        
        return katalog;
    }

}