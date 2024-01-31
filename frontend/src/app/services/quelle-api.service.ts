import { Observable } from "rxjs";
import { Quelle } from "../models/quelle.model";

export interface QuelleApiService {
    getQuellen(): Observable<Quelle[]>;
    save(quelle: Quelle): Observable<void>;
    delete(quelle: Quelle): Observable<void>;
}