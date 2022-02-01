const connection = require('./connection');

const createSale = async () => {
  const [sale] = await connection.execute(
    'INSERT INTO StoreManager.sales VALUES ()',
  );
  return sale.insertId;
};

const addProductToSales = async (id, array) => {
  /* const result =  */await connection.query(
    'INSERT INTO StoreManager.sales_products VALUES(?)',
    [array],
  );
  // return { id: result.insertId };
};

module.exports = {
  createSale,
  addProductToSales,
};

/* 
A funcção createSale é a responsável por criar uma venda gerando um id para ela.
*/
