import express from "express";
import * as path from "path";
import router from "./routes";
import { LogstashRunner } from "./logstash";
LogstashRunner.test();
const app = express();
const port = 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.locals.basedir = app.get("views");

app.use(express.json());
app.use(express.urlencoded());

app.get("/", (req, res) => {
  res.render("index", { hello: "World" });
});

app.use(router);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
