const connection = require('./connection');

const createProduct = async ({ name, quantity }) => {
  const [product] = await connection.execute(
    'INSERT INTO StoreManager.products (name, quantity) VALUES (?, ?)',
    [name, quantity],
  );

  return {
    id: product.insertId, // no bd id é autoincrement por isso o insertId
    name,
    quantity,
  };
};

const getAllProducts = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return products;
};

const findProductById = async (id) => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [id],
  );
  const product = result[0];

  return product;
};

const updateProductById = async (id, name, quantity) => {
  const [updatedProduct] = await connection.execute(
    'UPDATE StoreManager.products SET name = ?, quantity = ? WHERE id = ?',
    [name, quantity, id],
  );

  // se não tiver linhas alteradas com o produto atualizado, retorna null
  if (!updatedProduct.affectedRows) return null;

  return {
    id,
    name,
    quantity,
  };
};

const deleteProductById = async (id) => {
  const [deletedProduct] = await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?',
    [id],
  );
    if (!deletedProduct.affectedRows) return null;
  };

module.exports = {
  createProduct,
  getAllProducts,
  findProductById,
  updateProductById,
  deleteProductById,
};

/* 
Anotações:
O model é a camada mais próxima do BD, aqui executamos de fato as funções la do controller em formato de querys.

Observação: a função findProductById retorna um array de resultados, por isso precisamos pegar o primeiro elemento do array.

A função updateProductById faz a atualização de um produto no bd.
AffectedRows é uma propriedade do objeto que retorna do bd, se houve alguma alteração no bd. 
Obtém o número de linhas afetadas pelo último INSERT, UPDATE, REPLACE ou DELETE associado ao link_identifier.
fonte: https://www.php.net/manual/pt_BR/function.mysql-affected-rows.php
Pra finalizar retornamos com o produto atualizado.

*/
