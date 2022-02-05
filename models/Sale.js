const connection = require('./connection');

const createSale = async () => {
  const query = 'INSERT INTO StoreManager.sales VALUES ()';
  const [result] = await connection.execute(query);

  return result.insertId;
};

const createSalesProducts = async (array) => {
  const query = 'INSERT INTO StoreManager.sales_products VALUES ?';
  const result = await connection.query(query, [array]);
  return { id: result.insertId };
};

const getAll = async () => {
  const query = `
  SELECT p.sale_id as saleId,s.date,
  p.product_id,p.quantity
  FROM StoreManager.sales_products as p
  INNER JOIN StoreManager.sales as s
  ON p.sale_id = s.id`;
  const [sales] = await connection.execute(query);
  return sales;
};

const getById = async (id) => {
  const query = `SELECT s.date,p.product_id,p.quantity
  FROM StoreManager.sales_products as p
  INNER JOIN StoreManager.sales as s
  ON p.sale_id = s.id
  WHERE s.id = ?`;
  const [sale] = await connection.execute(query, [id]);

  if (!sale.length) return null;

  return sale;
};

const update = async (id, { product_id: productId, quantity }) => {
  const query = `
  UPDATE StoreManager.sales_products 
  SET product_id = ?, quantity= ?
  WHERE sale_id = ?`;
  const [result] = await connection.execute(query, [productId, quantity, id]);
  if (!result.changedRows) return null;
  return result;
};

const deleteSale = async (id) => {
  const query = `
  DELETE FROM StoreManager.sales
  WHERE id = ?`;
  const [result] = await connection.execute(query, [id]);
  if (!result.affectedRows) return null;
  return true;
};

module.exports = {
  createSale,
  createSalesProducts,
  getAll,
  getById,
  update,
  deleteSale,
};