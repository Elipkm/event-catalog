import * as quelleService from "../service/quelleService";

export async function getQuelleHandler(req: any, res: any): Promise<any> {
    try {
      console.log("getQuelle", req.params.id);
      let result =  await quelleService.getQuelle(req.params.id);
      res.status(200).json(result);
      return res;
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
      return res;
    }
}
export async function getQuelleListHandler(req: any, res: any): Promise<any> {
  try {
    let result = await quelleService.getQuelleList();
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}
export async function postQuelleHandler(req: any, res: any): Promise<any> {
    console.log("postQuelle", req.body);
    try {
        let result = await quelleService.saveQuelle(req.body);
        res.status(200).json({ success: true, message: result });
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error'});
      }
}

export async function deleteQuelleHandler(req: any, res: any): Promise<any>{
    try {
        let result = await quelleService.deleteQuelle(req.params.id);
        res.status(200).json({ success: true, message: result });
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
      }
}
  
