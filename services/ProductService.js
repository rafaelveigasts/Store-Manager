const ProductModel = require('../models/ProductModel');

const create = async ({ name, quantity }) => {
  const product = await ProductModel.create({ name, quantity });
  return product;
};

module.exports = {
  create,
};

/*  Anotação: como service está uma camada acima do model, ele vai passar as informações a serem adicionadas no DB,

*/