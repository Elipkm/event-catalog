import { QuelleImagesMockService } from "../app/services/quelle-images-mock.service";
import { QuelleImagesService } from "../app/services/quelle-images.service";
import { QuelleMockService } from "../app/services/quelle-mock.service";
import { QuelleService } from "../app/services/quelle.service";

export const environment = {
    production: false,
    providers: [
        { provide: QuelleService, useClass: QuelleMockService },
        { provide: QuelleImagesService, useClass: QuelleImagesMockService }
    ],

};