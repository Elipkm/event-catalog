
import { Router } from "express";
import * as imageController from "../controller/imageController";

export const router: Router = Router();

router.get('/image/:quelleId/:imageName', imageController.getImageHandler);
router.get('/images/names/:quelleId', imageController.getImageNameListHandler);
