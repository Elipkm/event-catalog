import { HttpClient } from "@angular/common/http";
import { QuelleImages } from "../models/quelle-images.model";
import { Quelle } from "../models/quelle.model";
import { QuelleImagesApiService } from "./quelle-images-api.sevice";
import { Observable, catchError, map, of } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class QuelleImagesService implements QuelleImagesApiService {

    constructor(private http: HttpClient) {}

    getQuelleImages(quelle: Quelle): Observable<QuelleImages | undefined> {
        let BASE_URL = "http://localhost:3000/api/image/" + quelle.id + "/";
        let endpoint: string = "http://localhost:3000/api/images/names/" + quelle.id;
        return this.http.get<string[]>(endpoint).pipe(
            map((filenames: string[]) =>
            ({
                quelle: quelle,
                baseImageUrl: BASE_URL,
                imagesId: filenames
            })
            ), catchError((error) => {
                console.log(error);
                return of(undefined);
            })
        );
    }
    
}