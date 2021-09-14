import express from "express";
import ConnectionsFile from "../data/connectionsFile";

const router = express.Router();

router.use("/api", require("./api"));

router.get("/connectors", (req, res) => {
  const connectionsFile = new ConnectionsFile();
  const connections = connectionsFile.getAllConnections();
  res.render("connectors/connectors", {
    connections,
  });
});
router.get("/connectors/new", (req, res) => {
  res.render("connectors/new-connector");
});

export default router;
