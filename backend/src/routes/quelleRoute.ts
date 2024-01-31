// scrapingRoutes.js


import { Router } from "express";
import * as quelleController from "../controller/quelleController";

export const router: Router = Router();

router.get('/quelle/:id', quelleController.getQuelleHandler);
router.post('/quelle', quelleController.postQuelleHandler);
router.delete('/quelle/:id', quelleController.deleteQuelleHandler);
router.get('/quelle', quelleController.getQuelleListHandler);
