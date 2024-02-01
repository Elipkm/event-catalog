import { updateKatalog } from "../service/katalogService";

export async function updateKatalogHandler(req: any, res: any): Promise<any> {
    try {
      console.log("update katalog");
      await updateKatalog();
      let result = "";
      res.status(200).json({success: true, message: result});
      return res;
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
      return res;
    }
}