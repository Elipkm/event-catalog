import path from "path";
import fs from "fs";

const SRC_FOLDER = "data/katalog/quelle/";

export function getImageFilePath(quelleId: any, imageName: any): string {
    console.log("getImage", quelleId, imageName);
    let relativePath = SRC_FOLDER + "id-" + quelleId + "/" + imageName;
    const absoluteFilePath = path.join(process.cwd(), relativePath);
    return absoluteFilePath;
}

export async function deleteQuelleImages(quelleId: any): Promise<void> {
    console.log("deleteQuelleImages", quelleId);
    let relativePath = SRC_FOLDER + "id-" + quelleId;
    let myPromise: Promise<void> = new Promise((resolve, reject) => {
        fs.rm(relativePath, { recursive: true }, (err) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                resolve();
            }
        });
    })
    return myPromise;
}

export async function getImageNameList(quelleId: any): Promise<string[]> {
    console.log("getImageNameList", quelleId);
    let relativePath = SRC_FOLDER + "id-" + quelleId;
    const absoluteFilePath = path.join(process.cwd(), relativePath);
    let myPromise: Promise<string[]> = new Promise((resolve, reject) => {
        fs.readdir(absoluteFilePath, (err, fileNames) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                resolve(fileNames);
            }
        });
    })
    return myPromise;
}