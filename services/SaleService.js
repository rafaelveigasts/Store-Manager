const SaleModel = require('../models/SaleModel');

const checkKey = (array) => {
 const ckekProductKey = array.some((sale) => sale.product_id === undefined);
 const ckekQuantityKey = array.some((sale) => sale.quantity === undefined);
 const valuesQuantity = array
 .some((sale) => sale.quantity <= 0 || typeof sale.quantity !== 'number');

 if (ckekProductKey) { 
   return { code: 400, message: { message: '"product_id" is required' } }; 
  }
  if (ckekQuantityKey) { 
    return { code: 400, message: { message: '"quantity" is required' } }; 
   } 
   if (valuesQuantity) { 
    return { code: 422,
       message: { message: '"quantity" must be a number larger than or equal to 1' } }; 
   }   
  return true;
};

const createSale = async () => {
  const result = await SaleModel.createSale();
  return result;
};

const createSalesProducts = async (array) => {
  const validations = checkKey(array);
  if (validations.message) return validations;
  const id = await createSale();
  const sales = array.map((sale) => [id, sale.product_id, sale.quantity]);
  await SaleModel.createSalesProducts(id, sales);
  return {
    id,
    itemsSold: array,
  };
};

const getAllSales = async () => {
  const allSales = await SaleModel.getAllSales();
  return allSales;
};

const getSaleById = async (id) => {
  const sale = await SaleModel.getSaleById(id);

  if (!sale) return { code: 404, message: { message: 'Sale not found' } };

  return sale;
};

module.exports = {
  createSalesProducts,
  getAllSales,
  getSaleById,
};

/* 
No controle do sale iremos passar um array para o model então temos que efetuar a sua validação com high order functions.

CreateSale é uma função que cria uma venda no banco de dados.

CreateSaleProduct recebe um array de objetos que representam os produtos que serão vendidos.
Passa pela validação, caso tenha uma chave de erro retorna o erro.

A constante id espera o banco de dados criar uma venda genérica, essa venda só retorna o numero do id no model.

O salesProducts é um array de arrays que representa os produtos que serão vendidos.

Mas quando o array de produtos é passado para o model, ele precisa de um id de venda, no formato de objeto, ou seja, um objeto que contenha um id de venda e dentro dele um array de produtos que são objetos com id de produto e quantidade.

Obs.: não sei pq mas se deixar a validação do array separado ele não passa.
 */