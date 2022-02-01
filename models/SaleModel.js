const connection = require('./connection');

const createSale = async () => {
  const query = 'INSERT INTO StoreManager.sales VALUES ()';
  const [result] = await connection.execute(query);
  
  return result.insertId;
};

const createSalesProducts = async (id, array) => {
  const query = 'INSERT INTO StoreManager.sales_products VALUES ?';
  await connection.query(query, [array]);
};
module.exports = {
  createSale,
  createSalesProducts,
};

/* 
A funcção createSale é a responsável por criar uma venda gerando um id para ela.
*/
