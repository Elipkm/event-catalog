import path from "path";
import fs from "fs";

const SRC_FOLDER = "data/katalog/quelle/";

export function getImageFilePath(quelleId: any, imageName: any): string {
    console.log("getImage", quelleId, imageName);
    let relativePath = SRC_FOLDER + "id-" + quelleId + "/" + imageName;
    const absoluteFilePath = path.join(process.cwd(), relativePath);
    return absoluteFilePath;
}

export async function deleteQuelleImages(quelleId: any): Promise<any> {
    console.log("deleteQuelleImages", quelleId);
    let relativePath = SRC_FOLDER + "id-" + quelleId;
    fs.rm(relativePath, { recursive: true }, (err) => {
        if (err) {
            console.error(err);
        }
    });
}

export async function getImageNameList(quelleId: any): Promise<any> {
    console.log("getImageNameList", quelleId);
    let relativePath = SRC_FOLDER + "id-" + quelleId;
    const absoluteFilePath = path.join(process.cwd(), relativePath);
    let fileNames: string[] = [];
    fs.readdirSync(absoluteFilePath).forEach(file => {
      fileNames.push(file);
    });
    return fileNames;
}