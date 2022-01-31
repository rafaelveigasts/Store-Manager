const connection = require('./connection');

const createSale = async ({ id, array }) => {
  const [sale] = await connection.execute(
    'INSERT INTO StoreManager.sales (id, array) VALUES (?, ?)',
    [id, array],
  );
  return sale.insertId;
};

module.exports = {
  createSale,
};

/* 
A funcção createSale recebe um array pois esse é um array de objetos que representam os produtos e quantidades que o usuário deseja comprar.
*/
