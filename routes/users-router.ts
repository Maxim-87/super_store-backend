import Router from "express";

import AuthController from "../controllers/AuthController";
import authMiddleware from "../middleware/auth-middleware";

// @ts-ignore
const usersRouter = new Router();

usersRouter.get("/", authMiddleware, AuthController.getUsers);

export default usersRouter;
