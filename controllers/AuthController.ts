import AuthService from "../service/AuthService";

// eslint-disable-next-line no-magic-numbers
const day30 = 30 * 24 * 60 * 60 * 1000;

class AuthController {
  // eslint-disable-next-line class-methods-use-this
  async registration(req: any, res: any) {
    try {
      const { email, password } = req.body;
      const userData = await AuthService.registration(email, password);

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: day30,
        httpOnly: true,
      });

      return res.json(userData);
    } catch (e) {
      console.log(e);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async login(req: any, res: any) {
    try {
      console.log("req.body = ", req.body);
      // const product = await ProductService.create(req.body, req.files.image);

      // const product = await ProductService.create(req.body);
      res.json({ name: "login" });
    } catch (e) {
      // eslint-disable-next-line no-magic-numbers
      res.status(500).json(e);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async logout(req: any, res: any) {
    try {
      console.log("req.body = ", req.body);
      // const product = await ProductService.create(req.body, req.files.image);

      // const product = await ProductService.create(req.body);
      // res.json(product);
    } catch (e) {
      // eslint-disable-next-line no-magic-numbers
      res.status(500).json(e);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async refresh(req: any, res: any) {
    try {
      console.log("req.body = ", req.body);
      // const product = await ProductService.create(req.body, req.files.image);

      // const product = await ProductService.create(req.body);
      // res.json(product);
    } catch (e) {
      // eslint-disable-next-line no-magic-numbers
      res.status(500).json(e);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async activate(req: any, res: any) {
    try {
      console.log("req.body = ", req.body);
      // const product = await ProductService.create(req.body, req.files.image);

      // const product = await ProductService.create(req.body);
      // res.json(product);
    } catch (e) {
      // eslint-disable-next-line no-magic-numbers
      res.status(500).json(e);
    }
  }
}

export default new AuthController();
