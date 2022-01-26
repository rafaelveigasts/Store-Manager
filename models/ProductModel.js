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

module.exports = {
  createProduct,
};
