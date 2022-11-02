import Router from "express";
// import fileMiddleware from "middleware/file";

import ProductController from "./controllers/ProductController";

// @ts-ignore
const router = new Router();

router.post("/products", ProductController.create);
router.get("/products", ProductController.getAll);
router.get("/products/:id", ProductController.getOne);
router.put("/products", ProductController.update);
router.delete("/products/:id", ProductController.delete);

export default router;
