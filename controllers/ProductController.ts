// eslint-disable-next-line import/no-unresolved
import ProductService from "../service/ProductService";

class ProductController {
  // eslint-disable-next-line class-methods-use-this
  async create(req: any, res: any) {
    try {
      console.log("req.files = ", req.files.image);
      console.log("req.body = ", req.body);
      const product = await ProductService.create(req.body, req.files.image);

      // const product = await ProductService.create(req.body);
      res.json(product);
    } catch (e) {
      // eslint-disable-next-line no-magic-numbers
      res.status(500).json(e);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async getAll(req: any, res: any) {
    try {
      const products = await ProductService.getAll();

      return res.json(products);
    } catch (e) {
      // eslint-disable-next-line no-magic-numbers
      res.status(500).json(e);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async getOne(req: any, res: any) {
    try {
      const product = await ProductService.getOne(req.params.id);

      return res.json(product);
    } catch (e) {
      // eslint-disable-next-line no-magic-numbers
      res.status(500).json(e);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async update(req: any, res: any) {
    try {
      const updateProduct = await ProductService.update(req.body);

      return res.json(updateProduct);
    } catch (e) {
      // @ts-ignore
      // eslint-disable-next-line no-magic-numbers
      res.status(500).json(e.message);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async delete(req: any, res: any) {
    try {
      const product = await ProductService.delete(req.params.id);

      return res.json(product);
    } catch (e) {
      // @ts-ignore
      // eslint-disable-next-line no-magic-numbers
      res.status(500).json(e.message);
    }
  }
}

export default new ProductController();
