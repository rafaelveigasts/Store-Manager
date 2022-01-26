const Joi = require('joi');
const Product = require('../services/ProductService');

const createProduct = async (req, res, next) => {
  const { name, quantity } = req.body;
  const { error } = Joi.object({
    name: Joi.string().min(5).required(),
    quantity: Joi.number().integer().min(1).required(),
  }).validate({ name, quantity });
  if (error) {
    return next(error);
  }
  const newProduct = await Product.createProduct(name, quantity);
  if (newProduct.error) return next(newProduct.error);
};

module.exports = {
  createProduct,
};
