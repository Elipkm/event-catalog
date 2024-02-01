import { Observable } from "rxjs";
import { Katalog } from "../models/katalog.model";
import { Quelle } from "../models/quelle.model";

export interface KatalogApiService {

    updateKatalog(): Observable<any>;
    getKatalog(quellen: Quelle[]): Katalog;
    
}