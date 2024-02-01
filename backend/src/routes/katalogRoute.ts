import { Router } from "express";
import { updateKatalogHandler } from "../controller/katalogController";

export const router: Router = Router();

router.post('/katalog/update', updateKatalogHandler);