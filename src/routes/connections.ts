import express from "express";
import { connectionsController } from "../controllers";

const router = express.Router();

router.get("/", connectionsController.getConnectionsView);
router.get("/new", connectionsController.getNetConnectionView);

module.exports = router;
