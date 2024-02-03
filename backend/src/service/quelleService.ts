import { Quelle } from "../model/quelleModel";
import fs from 'fs';
import { deleteQuelleImages } from "./imageService";

const filePath = "data/quelle.json";

export async function saveQuelle(quelle: Quelle): Promise<Quelle> {
    let alle = await getQuelleList();
    console.log("alle", alle);
    if(quelle.id){
      // update
      const index = alle.findIndex((item) => item.id === quelle.id);
      alle[index] = quelle;
    } else {
      // create
      quelle.id = generateId(alle);
      alle.push(quelle);
    }
    const jsonString = JSON.stringify(alle, null, 2);

    let myPromise: Promise<Quelle> = new Promise((resolve, reject) => {
      fs.writeFile(filePath, jsonString, (err: any) => {
        if (err) {
          console.error('Error saving JSON object to file:', err);
          reject(err);
        } else {
          console.log('JSON object saved to file:', filePath);
          resolve(quelle);
        }
      });
    });
    return myPromise;
}
function generateId(alleQuellen: Quelle[]): number {
  if (alleQuellen.length === 0) {
    return 1; // or handle accordingly
  }
  const highestId = Math.max(...alleQuellen.map(item => item.id));
  return highestId + 1;
}
export async function getQuelle(id: any){
    console.log("getQuelle (not implemented)", id);
}

export async function deleteQuelle(id: any): Promise<void> {
    console.log("deleteQuelle", id);
    let myPromise: Promise<void> = new Promise((resolve, reject) => {
      let quellenPromise: Promise<Quelle[]> = getQuelleList();
      quellenPromise.then((quellen: Quelle[]) => {
        let alleQuellen: Quelle[] = quellen;
        const index = alleQuellen.findIndex((item) => item.id == id);
        console.log("found quelle at index", index);

        if(index > -1){
          alleQuellen.splice(index, 1);
          const jsonString = JSON.stringify(alleQuellen, null, 2);
          fs.writeFile(filePath, jsonString, (err: any) => {
            if (err) {
              console.log('Error saving JSON object to file:', err);
              reject(err);
            } else {
              console.log('JSON object saved to file:', filePath);
              let quelleImagesPromise: Promise<void> = deleteQuelleImages(id);
              quelleImagesPromise.then(() => {
                resolve();
              }).catch((err) => {
                reject(err);
              });
            }
          });
        }
          reject("id not found");
      });
    });
  
    return myPromise;
}

export function getQuelleList(): Promise<Quelle[]> {
  let myPromise: Promise<Quelle[]> = new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        console.error('Error reading JSON file:', err);
        reject(err);
      } else {
        let quellen: Quelle[];
        if(!data){
          quellen = [];
        } else {
          quellen = JSON.parse(data);
        }
        resolve(quellen);
      }
    });
  });
  return myPromise;
}

