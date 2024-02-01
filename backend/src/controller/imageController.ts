import { getImageFilePath, getImageNameList } from "../service/imageService";

export async function getImageHandler(req: any, res: any): Promise<any> {
    try {
      console.log("getImage");
      console.log(req.params);
      let absoluteFilePath: string = getImageFilePath(req.params.quelleId, req.params.imageName);
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
      let fileNames = await getImageNameList(req.params.quelleId);
      res.status(200).json(fileNames);
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
      return res;
    }
}