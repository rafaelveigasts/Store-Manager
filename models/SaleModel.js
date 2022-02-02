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

const getAllSales = async () => {
  const query = `SELECT s.date,p.product_id,p.quantity
  FROM StoreManager.sales_products as p
  INNER JOIN StoreManager.sales as s
  ON p.sale_id = s.id`;
  const [sales] = await connection.execute(query);
  return sales;
};

module.exports = {
  createSale,
  createSalesProducts,
  getAllSales,
};

/* 
A funcção createSale é a responsável por criar uma venda gerando um id para ela.

A função createSalesProducts vai receber um id de venda e um array de objetos que representam os produtos que serão vendidos.

A função getAllSales vai buscar nas tabelas sales_products e sales todos os produtos vendidos

*/
