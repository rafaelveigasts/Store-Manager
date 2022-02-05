const ServiceSale = require('../services/Sale');

const createSales = async (req, res) => {
  const { body } = req;
  try {
    const sales = await ServiceSale.createSalesProducts(body);
    if (sales.message) return res.status(sales.code).json(sales.message);
    return res.status(201).json(sales);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAll = async (_req, res) => {
  try {
    const sales = await ServiceSale.getAll();
    return res.status(200).json(sales);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await ServiceSale.getById(id);
    if (sale.message) return res.status(sale.code).json(sale.message);
    return res.status(200).json(sale);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const updatedSale = await ServiceSale.update(id, body);
    if (updatedSale.message) return res.status(updatedSale.code).json(updatedSale.message);
    return res.status(200).json(updatedSale);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteSale = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await ServiceSale.deleteSale(id);
    if (result.message) return res.status(result.code).json(result.message);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createSales,
  getAll,
  getById,
  update,
  deleteSale,
};

/*
Antes nós extraíamos o que precisamos do body, mas agora iremos precisar do body como um objeto,
por isso o uso do destructuring.

instanciamos uma const com o nome de sales, que recebe o retorno do método createSalesProducts com todo o body.

Se o sales tiver uma propriedade message é pq deu erro, então retornamos o status e o json da mensagem que será tratado no service.

Se der certo retorna o status 201 e o json do sales.

Depois só o catch pra tratar o erro.

*/
