const ModelSale = require('../models/Sale');
const ModelProduct = require('../models/Product');

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

const checkQuantStock = async (array) => {
  const saleIsGrantStock = array.reduce(async (acc, curr) => {
    const quant = await ModelProduct.sumQuant(curr.product_id);
    if (curr.quantity > quant) return true;
    return acc;
  }, false);

  const result = await saleIsGrantStock;

  if (result) {
    return { code: 422, message: { message: 'Such amount is not permitted to sell' } };
  }
 return result;
};

const createSale = async () => {
  const result = await ModelSale.createSale();
  return result;
};

const decreaseQuant = (array) => {
 Promise.all(array.map(async (sale) => {
    await ModelProduct.decreseQuant(sale.product_id, sale.quantity);
  }));
};

const createSalesProducts = async (array) => {
  const validations = checkKey(array);
  if (validations.message) return validations;
  const validateStock = await checkQuantStock(array);
  if (validateStock.message) return validateStock;
  const id = await createSale();
  decreaseQuant(array);
  const sales = array.map((sale) => [id, sale.product_id, sale.quantity]);
  await ModelSale.createSalesProducts(sales);
  return {
    id,
    itemsSold: array,
  };
};

const getAll = async () => {
  const sales = await ModelSale.getAll();
  return sales;
};

const getById = async (id) => {
  const sale = await ModelSale.getById(id);

  if (!sale) {
    return { code: 404, 
      message: { message: 'Sale not found' } };
  }

  return sale;
};

const update = async (id, arrayBody) => {
  const validations = checkKey(arrayBody);
  if (validations.message) return validations;
  const [saleUpdate] = arrayBody;
  await ModelSale.update(id, saleUpdate);
  return {
    saleId: id,
    itemUpdated: arrayBody,
  };
};

const deleteSale = async (id) => {
  const foundedSales = await ModelSale.getById(id);

  if (!foundedSales) {
    return { code: 404, 
      message: { message: 'Sale not found' } };
  }
  Promise.all(
    foundedSales.map(async (sale) => { 
      ModelProduct.increaseQuant(sale.product_id, sale.quantity); 
    }),
  );
   await ModelSale.deleteSale(id);

   return foundedSales;
};

module.exports = {
  createSalesProducts,
  getAll,
  getById,
  update,
  deleteSale,
};

/* 
No controle do sale diferente do product, iremos passar o body inteiro da requisição, um array para o model então temos que efetuar a sua validação com high order functions.

CreateSale é uma função que cria uma venda no banco de dados.

CreateSaleProduct recebe um array de objetos que representam os produtos que serão vendidos.
Passa pela validação, caso tenha uma chave de erro retorna o erro.

A constante id espera o banco de dados criar uma venda genérica, essa venda só retorna o numero do id no model.

O sales é um array de arrays que representa os produtos que serão vendidos.

Mas quando o array de produtos é passado para o model, ele precisa de um id de venda, no formato de objeto, ou seja, um objeto que contenha um id de venda e dentro dele um array de produtos que são objetos com id de produto e quantidade.

Obs.: não sei pq mas se deixar a validação do array separado ele não passa.

a função update recebe um id pelo parametro, e um array de objetos que é o body da requisição que representam os produtos que serão vendidos. 
fazemos a requisição no banco e atribuimos a uma variavel e verificamos se ela tem a chave message, se tiver retornamos o erro.
se não tiver a chave message, retornamos o id da venda e o array de produtos que foram vendidos.

delete vai receber o id do parametro e usar o findbyid para encontrar a venda e deletar. Se não encontrar o id retorna um 404. 
Se por acaso a venda for excluída ele chama a função para aumentar a quantidade de produtos no estoque.

a funcao checkquantstock verifica no bd a quantidade com a função sumquant, se a quantidade for maior que a quantidade que está sendo vendida retorna true, se não retorna false.

*/