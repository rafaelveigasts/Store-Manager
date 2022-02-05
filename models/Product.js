const connection = require('./connection');

const create = async ({ name, quantity }) => {
  const query = 'INSERT INTO StoreManager.products(name, quantity) VALUES (?, ?)';
  const [result] = await connection.execute(query, [name, quantity]);

  return {
    id: result.insertId,
    name,
    quantity,
  };
};

const getAll = async () => {
  const query = 'SELECT * FROM StoreManager.products';
  const [products] = await connection.execute(query);

  return products;
};

const findById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?';
  const [result] = await connection.execute(query, [id]);
  const product = result[0];

  if (!product) return null;

  return product;
};

const update = async (id, name, quantity) => {
  const query = 'UPDATE StoreManager.products SET name= ?, quantity = ? WHERE id= ?';
  const [result] = await connection.execute(query, [name, quantity, id]);

  if (!result.changedRows) return null;

  return {
    id,
    name,
    quantity,
  };
};

const deleteProduct = async (id) => {
  const query = 'DELETE FROM StoreManager.products WHERE id= ?';
  const [result] = await connection.execute(query, [id]);
  if (!result.affectedRows) return null;

  return true;
};

const decreseQuant = async (id, quantity) => {
  const query = 'UPDATE StoreManager.products SET quantity = quantity - ? WHERE id = ?';
  const [result] = await connection.execute(query, [quantity, id]);
  return result.affectedRows;
};

const increaseQuant = async (id, quantity) => {
  const query = 'UPDATE StoreManager.products SET quantity = quantity + ? WHERE id = ?';
  const [result] = await connection.execute(query, [quantity, id]);
  return result.affectedRows;
};

const sumQuant = async (id) => {
  const query = 'SELECT quantity FROM StoreManager.products WHERE id = ?';
  const [result] = await connection.execute(query, [id]);
  const { quantity } = result[0];
  return quantity;
};

module.exports = {
  create,
  getAll,
  findById,
  update,
  deleteProduct,
  decreseQuant,
  increaseQuant,
  sumQuant,
};
/* 
Anotações:
O model é a camada mais próxima do BD, aqui executamos de fato as funções la do controller em formato de querys.

Observação: a função findById retorna um array de resultados, por isso precisamos pegar o primeiro elemento do array.

A função update faz a atualização de um produto no bd.
AffectedRows é uma propriedade do objeto que retorna do bd, se houve alguma alteração no bd. 
Obtém o número de linhas afetadas pelo último INSERT, UPDATE, REPLACE ou DELETE associado ao link_identifier.
fonte: https://www.php.net/manual/pt_BR/function.mysql-affected-rows.php
Pra finalizar retornamos com o produto atualizado.

as funções decrease, increase e sumQuant efetuam operacoes matematicas no bd.
onde elas recebem o id do produto e a quantidade a ser alterada e dependendo da função soma ou diminui a quantidade.
*/
