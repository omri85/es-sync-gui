import express from "express";
import ConnectionsStore from "../data/stores/ConnectionsStore";

const router = express.Router();

router.use("/api", require("./api"));
router.use("/connections", require("./connections"));

export default router;
