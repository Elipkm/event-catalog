import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { QuelleImagesService } from "../app/services/quelle-images.service";
import { QuelleService } from "../app/services/quelle.service";
import { KatalogService } from "../app/services/katalog.service";

export const environment = {
    production: true,
    providers: [
        {provide: QuelleService, useClass: QuelleService},
        {provide: QuelleImagesService, useClass: QuelleImagesService},
        {provide: KatalogService, useClass: KatalogService},
    ],
};