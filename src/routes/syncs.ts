import express from "express";
import { syncsController } from "../controllers";

const router = express.Router();

router.get("/", syncsController.getSyncsView);
// router.get("/new", connectionsController.getNetConnectionView);

module.exports = router;
