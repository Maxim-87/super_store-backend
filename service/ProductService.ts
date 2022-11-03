import fileService from "../fileService";
import Product from "../models/Product";

class ProductService {
  // eslint-disable-next-line class-methods-use-this
  async create(product: any, image: any) {
    const fileName = fileService.saveFile(image);
    const createdProduct = await Product.create({
      ...product,
      image: fileName,
    });

    return createdProduct;
  }

  // eslint-disable-next-line class-methods-use-this
  async getAll() {
    const products = await Product.find();

    return products;
  }

  // eslint-disable-next-line class-methods-use-this
  async getOne(id: any) {
    if (!id) {
      throw new Error("id не указан");
    }
    const product = await Product.findById(id);

    return product;
  }

  // eslint-disable-next-line class-methods-use-this
  async update(product: any) {
    if (!product.id) {
      throw new Error("id не указан");
    }
    const updatedProduct = await Product.findByIdAndUpdate(
      product.id,
      product,
      { new: true }
    );

    return updatedProduct;
  }

  // eslint-disable-next-line class-methods-use-this
  async delete(id: any) {
    if (!id) {
      throw new Error("id не указан");
    }
    const product = Product.findByIdAndDelete(id);

    return product;
  }
}

export default new ProductService();
