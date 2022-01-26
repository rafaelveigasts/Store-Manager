const connection = require('./connection');

const createProduct = async (name, quantity) => {
  const [product] = await connection.execute(
    'INSERT INTO products (name, quantity) VALUES (?, ?)',
    [name, quantity],
  );
  return product;
};

module.exports = {
  createProduct,
};
