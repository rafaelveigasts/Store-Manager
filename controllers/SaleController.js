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

module.exports = {
  createSale,
};

/*
Aqui como vamos receber um objeto, temos que pegar todo o body da requisição .

*/
