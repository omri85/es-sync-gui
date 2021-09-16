import express from "express";
import { ConnectionsApiController } from "../../controllers/api";

const router = express.Router();
const controller = new ConnectionsApiController();
// controller.create.bind(controller);

router.get("/:id", controller.get.bind(controller));
router.delete("/:id", controller.delete.bind(controller));
router.get("/", controller.getAll.bind(controller));
router.post("/", controller.create.bind(controller));

module.exports = router;
