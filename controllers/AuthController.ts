import { validationResult } from "express-validator";

import ApiError from "../exceptions/api-error";
import authService from "../service/AuthService";

// eslint-disable-next-line no-magic-numbers
const day30 = 30 * 24 * 60 * 60 * 1000;

class AuthController {
  // eslint-disable-next-line class-methods-use-this
  async registration(req: any, res: any, next: any) {
    try {
      const errors = validationResult(req); // check validation

      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Validation error", errors.array()));
      }
      const { email, password } = req.body;
      const userData = await authService.registration(email, password); // write data in dataBase and get token;

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: day30,
        httpOnly: true,
      });

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async login(req: any, res: any, next: any) {
    try {
      const { email, password } = req.body;
      const userData = await authService.login(email, password);

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: day30,
        httpOnly: true,
      });

      return res.json(userData);
    } catch (e) {
      // eslint-disable-next-line no-magic-numbers
      next(e);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async logout(req: any, res: any, next: any) {
    try {
      const { refreshToken } = req.cookies; // get cookies
      const token = await authService.logout(refreshToken); // delete refreshToken

      res.clearCookie("refreshToken", token); // clear cookie

      return res.json(token);
    } catch (e) {
      next(e);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async refresh(req: any, res: any, next: any) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await authService.refresh(refreshToken); // write data in dataBase and get token;

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: day30,
        httpOnly: true,
      });

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async activate(req: any, res: any, next: any) {
    try {
      const activateLink = req.params.link; // take link from params

      await authService.activate(activateLink); // activated link

      return res.redirect("http://localhost:3000"); // redirect to front
    } catch (e) {
      next(e);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async getUsers(req: any, res: any, next: any) {
    try {
      const users = await authService.getAllUsers();

      return res.json(users);
    } catch (e) {
      next(e);
    }
  }
}

export default new AuthController();
