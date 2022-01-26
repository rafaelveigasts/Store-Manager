const connection = require('./connection');

const createProduct = async ({ name, quantity }) => {
  const [product] = await connection.execute(
    'INSERT INTO StoreManager.products (name, quantity) VALUES (?, ?)',
    [name, quantity],
  );
  return {
    id: product.insertId,
    name,
    quantity,
  };
};

const getAllProducts = async () => {
  const [allProducts] = await connection.execute('SELECT * FROM StoreManager.products');
  return allProducts;
};

const findProductByName = async (name) => {
  const [product] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE name = ?',
    [name],
  );
  return product;
};

const findProductById = async (id) => {
  const [product] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [id],
  );
  return product;
};

module.exports = {
  createProduct,
  getAllProducts,
  findProductByName,
  findProductById,
};
