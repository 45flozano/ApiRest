const express = require("express");
const body_parser = require("body-parser");
const cors = require("cors");
const app = express();
const db_manager = require("./persistence/dbmanager");

app.use(body_parser.urlencoded({ extended: true }));
app.use(body_parser.json());
app.use(cors());

app.get("/", (req, res) => {
  db_manager.user_find_all(req, res);
});
app.get("/:id", (req, res) => {
  db_manager.user_find(req, res);
});
app.post("/user", (req, res) => {
  db_manager.user_create(req, res);
});
app.delete("/user/:id", (req, res) => {
  db_manager.user_delete(req, res);
});
app.put("/user/:id", (req, res) => {
  db_manager.user_update(req, res);
});

app.listen(8081, () => {
  console.log("http://localhost:8081");
});
