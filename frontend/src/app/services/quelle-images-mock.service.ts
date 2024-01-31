import { Observable, of } from "rxjs";
import { QuelleImages } from "../models/quelle-images.model";
import { Quelle } from "../models/quelle.model";
import { QuelleImagesApiService } from "./quelle-images-api.sevice";

export class QuelleImagesMockService implements QuelleImagesApiService {
    getQuelleImages(quelle: Quelle): Observable<QuelleImages> {
        return of({
            quelle: quelle,
            baseImageUrl: "https://cache.pressmailing.net/thumbnail/story_hires/6875a665-2989-4825-84f5-610d096be92f/",
            imagesId: ["image.jpg"]
        });
    }
}