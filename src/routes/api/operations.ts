import express from "express";
import OperationsApiController from "../../controllers/api/OperationsApiController";

const router = express.Router();
const controller = new OperationsApiController();

router.get("/:id", controller.get.bind(controller));
router.delete("/:id", controller.delete.bind(controller));
router.get("/", controller.getAll.bind(controller));
router.post("/", controller.create.bind(controller));

module.exports = router;
