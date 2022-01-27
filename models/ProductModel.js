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

module.exports = {
  createProduct,
  getAllProducts,
  findProductById,
};

/* 
Anotações:
O model é a camada mais próxima do BD, aqui executamos de fato as funções la do controller em formato de querys.

Observação: a função findProductById retorna um array de resultados, por isso precisamos pegar o primeiro elemento do array.
*/