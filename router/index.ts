import Router from "express";

import AuthController from "../controllers/AuthController";
import ProductController from "../controllers/ProductController";
// import fileMiddleware from "middleware/file";

// @ts-ignore
const router = new Router();

router.get("/registration", AuthController.registration);
router.post("/login", AuthController.login);
router.post("/logout", AuthController.logout);
router.post("/activate/:link", AuthController.activate);
router.post("/refresh", AuthController.refresh);
router.post("/users", ProductController.create);

router.post("/products", ProductController.create);
router.get("/products", ProductController.getAll);
router.get("/products/:id", ProductController.getOne);
router.put("/products", ProductController.update);
router.delete("/products/:id", ProductController.delete);

export default router;
