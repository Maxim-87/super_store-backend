class AuthController {
  // eslint-disable-next-line class-methods-use-this
  async registration(req: any, res: any) {
    try {
      console.log("req.body = registration");
      // const product = await ProductService.create(req.body, req.files.image);

      // const product = await ProductService.create(req.body);
      res.json({ name: "registration" });
    } catch (e) {
      // eslint-disable-next-line no-magic-numbers
      res.status(500).json(e);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async login(req: any, res: any) {
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
