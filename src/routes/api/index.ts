import express from "express";
const router = express.Router();

router.use("/connection", require("./connection"));

module.exports = router;
