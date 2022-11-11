import Router from "express";

import ProductController from "../controllers/ProductController";

// @ts-ignore
const productsRouter = new Router();

productsRouter.get("/", ProductController.getAll);
productsRouter.post("/", ProductController.create);
productsRouter.get("/:id", ProductController.getOne);
productsRouter.put("/", ProductController.update);
productsRouter.delete("/:id", ProductController.delete);

export default productsRouter;
