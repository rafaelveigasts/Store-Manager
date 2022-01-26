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
  const [products] = await connection.execute('SELECT * FROM StoreManager.products');
  return products;
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
  findProductById,
};
