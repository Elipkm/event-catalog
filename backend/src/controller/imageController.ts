import path from "path";
import fs from "fs";

export async function getImageHandler(req: any, res: any): Promise<any> {
    try {
      console.log("getImage");
      console.log(req.params);
      let relativePath = "data/katalog/quelle/id-" + req.params.quelleId + "/" + req.params.imageName;
      const absoluteFilePath = path.join(process.cwd(), relativePath);

      res.status(200).type('image/png').sendFile(absoluteFilePath);
      return res;
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
      return res;
    }
}

export async function getImageNameListHandler(req: any, res: any): Promise<any> {
    try {
      console.log("getImageNameList");
      console.log(req.params);
      let relativePath = "data/katalog/quelle/id-" + req.params.quelleId;
      const absoluteFilePath = path.join(process.cwd(), relativePath);
      let fileNames: string[] = [];
      fs.readdirSync(absoluteFilePath).forEach(file => {
        fileNames.push(file);
      })
      res.status(200).json(fileNames);
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
      return res;
    }
}