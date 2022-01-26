const Product = require('../models/ProductModel');

const createProduct = async (name, quantity) => {
  await Product.createProduct(name, quantity);
    
  return true;
};

module.exports = {
  createProduct,
};
