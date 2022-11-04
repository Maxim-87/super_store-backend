import Router from "express";

import AuthController from "../controllers/AuthController";
import ProductController from "../controllers/ProductController";
// import fileMiddleware from "middleware/file";

// @ts-ignore
const router = new Router();

router.post("/registration", AuthController.registration);
router.get("/login", AuthController.login);
router.get("/logout", AuthController.logout);
router.get("/activate/:link", AuthController.activate);
router.get("/refresh", AuthController.refresh);
router.get("/users", ProductController.create);

router.post("/products", ProductController.create);
router.get("/products", ProductController.getAll);
router.get("/products/:id", ProductController.getOne);
router.put("/products", ProductController.update);
router.delete("/products/:id", ProductController.delete);

export default router;