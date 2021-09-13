import express from "express";

const router = express.Router();

router.use("/api", require("./api"));

router.get("/connectors", (req, res) => {
  res.render("connectors/connectors.pug");
});
router.get("/connectors/new", (req, res) => {
  res.render("connectors/new-connector");
});

export default router;
