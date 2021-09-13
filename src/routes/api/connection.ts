import express from "express";
import { connectionController } from "../../controllers";

const router = express.Router();

router.get("/:name", connectionController.getConnection);
router.get("/", connectionController.getAllConnections);
router.post("/", connectionController.addConnection);

module.exports = router;
