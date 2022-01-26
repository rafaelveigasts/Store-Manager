const ProductModel = require('../models/ProductModel');

const createProduct = async ({ name, quantity }) => {
  const product = await ProductModel.createProduct({ name, quantity });
  return product;
};

module.exports = {
  createProduct,
};

/*  Anotação: como service está uma camada acima do model, ele vai passar as informações a serem adicionadas no DB,

*/