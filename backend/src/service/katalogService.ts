import { getQuelleList } from "./quelleService";
import { takeScreenshots } from "./screenshotService";

export async function updateKatalog(): Promise<any> {
    let quellen = getQuelleList();
    await takeScreenshots(quellen);
}