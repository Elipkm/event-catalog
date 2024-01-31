import { Katalog } from "../models/katalog.model";
import { Quelle } from "../models/quelle.model";

export interface KatalogApiService {

    updateKatalog(quellen: Quelle[]): void;
    getKatalog(quellen: Quelle[]): Katalog;
    
}