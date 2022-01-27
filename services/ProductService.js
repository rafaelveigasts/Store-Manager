const ProductModel = require('../models/ProductModel');

const createProduct = async ({ name, quantity }) => {
  const product = await ProductModel.createProduct({ name, quantity });
  return product;
};

const getAllProducts = async () => {
  const products = await ProductModel.getAllProducts();
  return products;
};

const findProductById = async (id) => {
  const product = await ProductModel.findProductById(id);
  if (!product) {
    return { code: 404, message: { message: 'Product not found' } };
  }

  return product;
};

const updateProductById = async (id, name, quantity) => {
  const updatedProduct = await ProductModel.updateProductById(id, name, quantity);
  if (!updatedProduct) {
    return { code: 404, message: { message: 'Product not found' } };
  }
  return updatedProduct;
};

module.exports = {
  createProduct,
  getAllProducts,
  findProductById,
  updateProductById,
};

/*  Anotação: como service está uma camada acima do model, ele vai passar as informações a serem adicionadas no DB,
Sempre passar as funções do model aqui com o mesmo nome, pois é daqui que ela vai para o controller.

Obs.: na função findProductByID definimos duas chaves no controller, uma para o código de erro e outra para a mensagem de erro.
Essas chaves estão vazias, portanto aqui eu fiz o valor delas. 
Ou seja, se meu product tiver a propriedade code ou message no controller o service vai identificar e atribuir esses valores a ele.

A função updateProductById segue a mesma lógica do findProductById, porém com a diferença de que ela vai atualizar o produto no bd.
*/
