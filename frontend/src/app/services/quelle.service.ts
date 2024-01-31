import { Injectable } from "@angular/core";
import { Quelle } from "../models/quelle.model";
import { QuelleApiService } from "./quelle-api.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class QuelleService implements QuelleApiService {
    constructor(private http: HttpClient) {}
    delete(quelle: Quelle): Observable<any> {
        return this.http.delete('http://localhost:3000/api/quelle/' + quelle.id);
    }
    save(quelle: Quelle): Observable<any> {
        return this.http.post('http://localhost:3000/api/quelle', quelle, {headers: {'Content-Type': 'application/json'}});
    }
    getQuellen(): Observable<Quelle[]> {
        return this.http.get<Quelle[]>('http://localhost:3000/api/quelle');
    }
}