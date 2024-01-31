import { QuelleImages } from "./quelle-images.model";

export interface Katalog {
    id: number,
    date: Date,
    bilderQuellen: QuelleImages[];
}