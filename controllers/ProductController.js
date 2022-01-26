const ProductService = require('../services/ProductService');

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const newProduct = await ProductService.createProduct({ name, quantity });
  res.status(201).json(newProduct);
};

module.exports = {
  createProduct,
};

/* Anotação: controller é a camada mais próxima do usuário.
Vamos imaginar o seguinte:
o usuario quer cadastrar um produto no banco de dados.
Ele da entrada na rota /products e envia um json com o nome e a quantidade do produto.
Recuperamos do corpo da requisição o nome e a quantidade do produto já em formato json/objeto.
O controller vai receber essa requisição e vai passar para o service.
O service vai passar para o model.
O model vai passar para o bd.
**detalhe importante** o nome da função createProduct é o mesmo nome da função no service e no model.
*/