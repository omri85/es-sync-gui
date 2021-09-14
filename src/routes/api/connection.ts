import express from "express";
import { connectionsApiController } from "../../controllers/api";

const router = express.Router();

router.get("/:name", connectionsApiController.getConnection);
router.get("/", connectionsApiController.getAllConnections);
router.post("/", connectionsApiController.addConnection);

module.exports = router;
