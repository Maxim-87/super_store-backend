import Router from "express";
import { body } from "express-validator";

import AuthController from "../controllers/AuthController";

// @ts-ignore
const authRouter = new Router();

authRouter.post(
  "/registration",
  body("email").isEmail().withMessage("invalid email"), // check email
  body("password").isLength({ min: 3, max: 32 }), // check password length
  AuthController.registration
);
authRouter.post("/login", AuthController.login);
authRouter.post("/logout", AuthController.logout);
authRouter.get("/activate/:link", AuthController.activate);
authRouter.get("/refresh", AuthController.refresh);

export default authRouter;
