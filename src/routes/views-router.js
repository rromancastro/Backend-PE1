import { Router } from "express";
import fs from "fs";
import path from "path";

const router = Router();


let products = [];
fs.promises.readFile(path.join(`${process.cwd()}/src/data/products.json`), "utf-8")
.then((data) => {
  products = JSON.parse(data);
})
.catch((err) => {
  console.log(err);
});

router.get("/", (req, res) => {
    res.render ("home", {products});
});

router.get("/realtimeproducts", (req, res) => {
  res.render ("realTimeProducts");
});

export default router;
