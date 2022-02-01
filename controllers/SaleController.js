const SaleService = require('../services/SaleService');

const createSale = async (req, res) => {
  const { body } = req;
  console.log('controller', body);
  try {
    const sale = await SaleService.addProductToSales(body);
    if (sale.message) return res.status(sale.code).json(sale.message);
    return res.status(201).json({ message: sale });
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
