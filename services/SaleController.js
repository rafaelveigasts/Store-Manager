const SaleModel = require('../models/SaleModel');
const saleValidations = require('../middlewares/saleValidations');

const createSale = async () => {
  const [sale] = await SaleModel.createSale();
  return sale;
};

const createSaleProduct = async (array) => {
  const saleValidation = saleValidations.checkProperty(array);
  if (saleValidation.message) return saleValidations;
  const id = await createSale();
  const salesProducts = array.map((sale) => [id, sale.product_id, sale.quantity]);
  await SaleModel.addProductToSales(salesProducts);
  return {
    id, 
    itemSold: array,
  };
};

module.exports = {
  createSaleProduct,
};

/* 
No controle do sale iremos passar um array para o model então temos que efetuar a sua validação com high order functions.

CreateSale é uma função que cria uma venda no banco de dados.

CreateSaleProduct recebe um array de objetos que representam os produtos que serão vendidos.
Passa pela validação, caso tenha uma chave de erro retorna o erro.

A constante id espera o banco de dados criar uma venda genérica.

O salesProducts é um array de arrays que representa os produtos que serão vendidos.

Mas quando o array de produtos é passado para o model, ele precisa de um id de venda, no formato de objeto, ou seja, um objeto que contenha um id de venda e dentro dele um array de produtos que são objetos com id de produto e quantidade.
 */