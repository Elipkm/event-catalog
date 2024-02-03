import { Quelle } from "../model/quelleModel";
import { getQuelleList } from "./quelleService";
import { takeScreenshots } from "./screenshotService";

export async function updateKatalog(): Promise<any> {
    await getQuelleList().then((quellen: Quelle[]) => {
        takeScreenshots(quellen, true);
    });
}

export async function updateKatalogSpecificQuellen(quellen: Quelle[]): Promise<any> {
    await takeScreenshots(quellen, false);
}