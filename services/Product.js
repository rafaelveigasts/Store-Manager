const ModelProduct = require('../models/Product');

const create = async ({ name, quantity }) => {
  const products = await ModelProduct.getAll();
  const productExists = products.some((product) => product.name === name);

  if (productExists) {
    return { code: 409, 
      message: { message: 'Product already exists' } };
  }

  const response = await ModelProduct.create({ name, quantity });
  return response;
};

const getAll = async () => {
  const products = await ModelProduct.getAll();
  return products;
};

const findById = async (id) => {
  const foundedProduct = await ModelProduct.findById(id);

  if (!foundedProduct) {
    return { code: 404, 
      message: { message: 'Product not found' } };
  }

  return foundedProduct;
};

const update = async (id, name, quantity) => {
  const updatedProduct = await ModelProduct.update(id, name, quantity);

  if (!updatedProduct) {
    return { code: 404, 
      message: { message: 'Product not found' } };
  }

  return updatedProduct;
};

const deleteProduct = async (id) => {
  const foundedProduct = await ModelProduct.findById(id);

  if (!foundedProduct) {
    return { code: 404, 
      message: { message: 'Product not found' } };
  }
  await ModelProduct.deleteProduct(id);

  return foundedProduct;
};

module.exports = {
  create,
  getAll,
  findById,
  update,
  deleteProduct,
};
/*  Anotação: como service está uma camada acima do model, ele vai passar as informações a serem adicionadas no DB,
Sempre passar as funções do model aqui com o mesmo nome, pois é daqui que ela vai para o controller.

Obs.: na função findProductByID definimos duas chaves no controller, uma para o código de erro e outra para a mensagem de erro.
Essas chaves estão vazias, portanto aqui eu fiz o valor delas. 
Ou seja, se meu product tiver a propriedade code ou message no controller o service vai identificar e atribuir esses valores a ele.

A função updateProductById segue a mesma lógica do findProductById, porém com a diferença de que ela vai atualizar o produto no bd.

A função deleteProductById primeiro localiza o produto, se não encontrar retorna um 404, se encontrar deleta o produto e retorna o produto deletado.
*/
