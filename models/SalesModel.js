const connection = require('./connection');

const createSale = async () => {
  const [sale] = await connection.execute(
    'INSERT INTO StoreManager.sales () VALUES ()',
  );
  return sale.insertId;
};

const addProductToSale = async (saleId, productId, quantity) => {
  const [sale] = await connection.execute(
    'INSERT INTO StoreManager.sale_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [saleId, productId, quantity],
  );
  return sale;
};

module.exports = {
  createSale,
  addProductToSale,
};

/* 
A funcção createSale é a responsável por criar uma venda gerando um id para ela.

A funcção addProductToSale é responsável por adicionar um produto a uma venda.
*/
