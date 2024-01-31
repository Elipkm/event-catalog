import { Observable } from "rxjs";
import { QuelleImages } from "../models/quelle-images.model";
import { Quelle } from "../models/quelle.model";

export interface QuelleImagesApiService {

    getQuelleImages(quelle: Quelle): Observable<QuelleImages | undefined>;
}