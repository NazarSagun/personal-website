const ApiError = require("../exeptions/api-error");
const Products = require("../models/shop/product-model");
const ProductType = require("../models/shop/type-model");
const uuid = require("uuid");
const path = require("path");

class ShopService {
  async getTypes() {
    const types = await ProductType.find();
    return types;
  }

  async createType(type) {
    const existingType = await ProductType.findOne({ type });
    if (existingType) {
      throw ApiError.BadRequest(
        `Product type with name ${existingType} already exists`
      );
    }

    const newType = await ProductType.create({ type });
    const productTypeDto = {
      id: newType._id,
      type,
    };

    return productTypeDto;
  }

  async getProducts(type) {
    let products;
    if (!type) {
      products = await Products.find();
    }
    if (type) {
      products = await Products.find({ type });
    }

    return products;
  }

  async getTypedProducts(type) {
    let products = await Products.find({ type: type });
    if(products.length <= 0) {
      throw ApiError.BadRequest("No products found")
    }
    return products;
  }

  async getProduct(id) {
    const product = await Products.findById(id);
    if (!product) {
      throw ApiError.BadRequest("No such product");
    }
    return product;
  }

  async createProduct(productData) {
    let {
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
    } = productData;

    const productName = await Products.findOne({ name });
    if (productName) {
      throw ApiError.BadRequest("Product already exists");
    }

    const images = [img, img2, img3, img4].map((img) => {
      if (!img) {
        return null;
      }
      return img;
    });
    const filteredImages = images.filter((i) => i !== null);
    console.log(filteredImages)
    const transformedImages = filteredImages.map((img) => {
      let filename = img.mimetype === "image/png" ?  uuid.v4() + ".png" : uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "static", filename));
      return { img: filename };
    });

    if (details) {
      details = JSON.parse(details);
    }

    if (sizes) {
      sizes = JSON.parse(sizes);
    }

    const product = await Products.create({
      type,
      name,
      price,
      description,
      details,
      sizes,
      amount,
      images: transformedImages,
    });

    return product;
  }
}

module.exports = new ShopService();
