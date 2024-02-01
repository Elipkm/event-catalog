import { Router } from "express";
import { updateKatalogHandler, updateKatalogSpecificHandler } from "../controller/katalogController";

export const router: Router = Router();

router.post('/katalog/update', updateKatalogHandler);
router.put('/katalog/updateSpecific', updateKatalogSpecificHandler);