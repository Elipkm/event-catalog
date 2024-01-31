import { Quelle } from "../model/quelleModel";
import fs from 'fs';

const filePath = "data/quelle.json";

export async function saveQuelle(quelle: Quelle){
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

    fs.writeFile(filePath, jsonString, (err: any) => {
      if (err) {
        console.error('Error saving JSON object to file:', err);
      } else {
        console.log('JSON object saved to file:', filePath);
      }
    });
}
function generateId(alleQuellen: Quelle[]): number {
  if (alleQuellen.length === 0) {
    return 1; // or handle accordingly
  }
  const highestId = Math.max(...alleQuellen.map(item => item.id));
  return highestId + 1;
}
export async function getQuelle(id: any){
    console.log("getQuelle", id);
}

export async function deleteQuelle(id: any){
    console.log("deleteQuelle", id);
    let alle = getQuelleList();
    const index = alle.findIndex((item) => item.id === id);
    alle.splice(index, 1);
    const jsonString = JSON.stringify(alle, null, 2);
    fs.writeFile(filePath, jsonString, (err: any) => {
      if (err) {
        console.error('Error saving JSON object to file:', err);
      } else {
        console.log('JSON object saved to file:', filePath);
      }
    });
}

export function getQuelleList(): Quelle[] {
  let data: string = fs.readFileSync(filePath, "utf-8");
  let quellen: Quelle[];
  if(!data){
    quellen = [];
  } else {
    quellen = JSON.parse(data);
  }
  return quellen;
}

