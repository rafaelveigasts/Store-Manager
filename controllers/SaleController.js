const SaleService = require('../services/SaleService');

const createSale = async (req, res) => {
  const { body } = req;
  try {
    const sales = await SaleService.createSalesProducts(body);
    if (sales.message) return res.status(sales.code).json(sales.message);
    return res.status(201).json(sales);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllSales = async (req, res) => {
  try {
    const sales = await SaleService.getAllSales();
    return res.status(200).json(sales);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getSaleById = async (req, res) => {
  const { params: { id } } = req;
  try {
    const sale = await SaleService.getSaleById(id);
    if (!sale) return res.status(404).json(sale.message);
    return res.status(200).json(sale);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
};

/*
Antes nós extraíamos o que precisamos do body, mas agora iremos precisar do body como um objeto,
por isso o uso do destructuring.

instanciamos uma const com o nome de sales, que recebe o retorno do método createSalesProducts com todo o body.

Se o sales tiver uma propriedade message é pq deu erro, então retornamos o status e o json da mensagem que será tratado no service.

Se der certo retorna o status 201 e o json do sales.

Depois só o catch pra tratar o erro.

*/
