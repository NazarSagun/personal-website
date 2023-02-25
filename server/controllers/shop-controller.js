const shopService = require("../service/shop-service");

class ShopController {
  async createProduct(req, res, next) {
    try {
      const { type, name, price, description, details, sizes, amount } =
        req.body;
      const { img, img2, img3, img4 } = req.files;
      const productData = {
        type,
        name,
        price,
        description,
        details,
        sizes,
        amount,
        img,
        img2,
        img3,
        img4,
      };
      const product = await shopService.createProduct(productData);
      const productDto = [
        {
          id: product._id,
          amount: product.amount,
          description: product.description,
          name: product.name,
          price: product.price,
          type: product.type,
          images: product.images,
          sizes: product.sizes,
          details: product.details,
        },
      ];
      return res.json(productDto);
    } catch (e) {
      next(e);
    }
  }

  async getProducts(req, res, next) {
    try {
      const { type } = req.params;
      let products;
      if (!type) {
        products = await shopService.getProducts();
      }
      if (type) {
        products = await shopService.getProducts(type);
      }
      const mappedProducts = products.map((item) => {
        const product = {
          id: item._id,
          amount: item.amount,
          description: item.description,
          name: item.name,
          price: item.price,
          type: item.type,
          images: item.images,
          sizes: item.sizes,
          details: item.details,
        };
        return product;
      });
      return res.json(mappedProducts);
    } catch (e) {
      next(e);
    }
  }

  async getTypedProducts(req, res, next) {
    try {
      const { type } = req.body;

      let products = await shopService.getTypedProducts(type);

      const mappedProducts = products.map((item) => {
        const product = {
          id: item._id,
          amount: item.amount,
          description: item.description,
          name: item.name,
          price: item.price,
          type: item.type,
          images: item.images,
          sizes: item.sizes,
          details: item.details,
        };
        return product;
      });
      return res.json(mappedProducts);
    } catch (e) {
      next(e);
    }
  }

  async getProduct(req, res, next) {
    try {
      const { id } = req.params;
      const product = await shopService.getProduct(id);
      const productDto = {
        id: product._id,
        amount: product.amount,
        description: product.description,
        name: product.name,
        price: product.price,
        type: product.type,
        images: product.images,
        sizes: product.sizes,
        details: product.details,
      };
      return res.send(productDto);
    } catch (e) {
      next(e);
    }
  }

  async createType(req, res, next) {
    try {
      const { type } = req.body;
      const newType = await shopService.createType(type);
      return res.json(newType);
    } catch (e) {
      next(e);
    }
  }

  async getTypes(req, res, next) {
    try {
      const types = await shopService.getTypes();
      const mappedTypes = types.map((type) => {
        return {
          id: type._id,
          type: type.type,
          products: type.products,
        };
      });
      return res.json(mappedTypes);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new ShopController();
