const ServiceProduct = require('../services/Product');

const create = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const product = await ServiceProduct.create({ name, quantity });
    if (product.message) return res.status(product.code).json(product.message);
    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAll = async (_req, res) => {
  try {
    const products = await ServiceProduct.getAll();
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const findById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await ServiceProduct.findById(id);
    if (product.message) return res.status(product.code).json(product.message);
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  try {
    const updatedProduct = await ServiceProduct.update(id, name, quantity);
    if (updatedProduct.message) {
      return res.status(updatedProduct.code).json(updatedProduct.message);
    } 
    return res.status(200).json(updatedProduct);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await ServiceProduct.deleteProduct(id);
    if (result.message) {
      return res.status(result.code).json(result.message);
    } 
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  create,
  getAll,
  findById,
  update,
  deleteProduct,
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

Resumo: 
A função create vai receber o nome e quantidade que vem do body da requisição.
Usamos o try para tentar fazer o cadastro do produto.
Vai executar o create product no service que por sua vez vai executar o createProduct no model, assim criando o produto no bd.
Se der certo ele retorna um status 201 e o produto criado.
Se der errado ele retorna um status 500 e uma mensagem de erro dentro do catch.

A função getAll vai retornar todos os produtos do bd.
Usamos o try para tentar recuperar todos os produtos.
Vai executar o getAll no service que por sua vez vai executar o getAll no model, assim recuperando todos os produtos do bd.
Se der certo ele retorna um status 200 e todos os produtos.
Se der errado ele retorna um status 500 e uma mensagem de erro dentro do catch.

A função findById é uma das mais importantes, pois ela vai ser usada para recuperar um produto específico e com isso podemos fazer um update ou delete do mesmo.
Ela vai receber o id do parâmetro da requisição.
Usamos o try para tentar recuperar o produto.
Vai executar o findProductById no service que por sua vez vai executar o findProductById no model, assim recuperando o produto do bd.
Se der certo ele retorna um status 200 e o produto.code e product.message. 
Essas são chaves que serão usadas no service.
Se der errado ele retorna um status 500 e uma mensagem de erro dentro do catch.

A função update vai receber o id do produto e o nome e a quantidade do produto e a logica é bem parecida da função findById.

Diferente do update, o delete precisa somente do id do produto que vem através do parâmetro da requisição.
Com isso usamos o try para deletar passando o productService.deleteProduct e retornando o status que é manipulado no service.
Se der certo ele retorna um status 200 e uma mensagem de sucesso.
Se der errado ele retorna um status 500 e uma mensagem de erro dentro do catch.
*/
