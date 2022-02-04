const ProductService = require('../services/Product');

const createProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const newProduct = await ProductService.createProduct({ name, quantity });
    if (newProduct.message) return res.status(newProduct.code).json(newProduct.message);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await ProductService.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const findProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await ProductService.findProductById(id);
    if (product.message) {
      return res.status(product.code).json(product.message);
    }
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateProductById = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  try {
    const updatedProduct = await ProductService.updateProductById(
      id,
      name,
      quantity,
    );
    if (updatedProduct.message) {
      return res.status(updatedProduct.code).json(updatedProduct.message);
    }
    return res.status(200).json(updatedProduct);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await ProductService.deleteProductById(id);
    if (deletedProduct.message) {
      return res.status(deletedProduct.code).json(deletedProduct.message);
    }
    return res.status(200).json(deletedProduct);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  findProductById,
  updateProductById,
  deleteProductById,
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
A função createProduct vai receber o nome e quantidade que vem do body da requisição.
Usamos o try para tentar fazer o cadastro do produto.
Vai executar o create product no service que por sua vez vai executar o createProduct no model, assim criando o produto no bd.
Se der certo ele retorna um status 201 e o produto criado.
Se der errado ele retorna um status 500 e uma mensagem de erro dentro do catch.

A função getAllProducts vai retornar todos os produtos do bd.
Usamos o try para tentar recuperar todos os produtos.
Vai executar o getAllProducts no service que por sua vez vai executar o getAllProducts no model, assim recuperando todos os produtos do bd.
Se der certo ele retorna um status 200 e todos os produtos.
Se der errado ele retorna um status 500 e uma mensagem de erro dentro do catch.

A função findByProductId é uma das mais importantes, pois ela vai ser usada para recuperar um produto específico e com isso podemos fazer um update ou delete do mesmo.
Ela vai receber o id do parâmetro da requisição.
Usamos o try para tentar recuperar o produto.
Vai executar o findProductById no service que por sua vez vai executar o findProductById no model, assim recuperando o produto do bd.
Se der certo ele retorna um status 200 e o produto.code e product.message. 
Essas são chaves que serão usadas no service.
Se der errado ele retorna um status 500 e uma mensagem de erro dentro do catch.

A função updateProductById vai receber o id do produto e o nome e a quantidade do produto e a logica é bem parecida da função findByProductId.

Diferente do update, o delete precisa somente do id do produto que vem através do parâmetro da requisição.
Com isso usamos o try para deletar passando o productService.deleteProductById e retornando o status que é manipulado no service.
Se der certo ele retorna um status 200 e uma mensagem de sucesso.
Se der errado ele retorna um status 500 e uma mensagem de erro dentro do catch.
*/