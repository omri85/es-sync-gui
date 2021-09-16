import express from "express";
import { importsController } from "../controllers";

const router = express.Router();

router.get("/", importsController.getImportsView);
router.get("/new", importsController.getNewImportView);

module.exports = router;
