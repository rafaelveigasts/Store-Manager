const checkProperty = (array) => {
  const hasUndefinedKey = array.some((sale) => 
  Object.keys(sale).includes(undefined === 'product_id'));
  if (hasUndefinedKey) {
    return { code: 400, message: { message: 'The product_id is required' } }; 
}
  const hasEmptyQuantity = array.some((sale) => Object.keys(sale).includes('' === 'quantity'));
  if (hasEmptyQuantity) {
    return { code: 400, message: { message: 'The quantity is required' } };
  }
  const hasNegativeQuantity = array.some((sale) =>
    Object.keys(sale).includes(sale.quantity < 0 || typeof sale.quantity !== 'number'));
  if (hasNegativeQuantity) {
    return {
      code: 400,
      message: { message: '"quantity" must be a number larger than or equal to 1' },
    };
  }
  return true;
};

module.exports = {
  checkProperty,
};

/* A função CheckProperty verifica primeiramente se o array não está vazio e se algum dos elementos do array tem a chave product_id.
Caso tenha a chave product_id, verifica se a chave quantity está vazia ou se o valor da chave quantity é menor que 0 ou se o valor da chave quantity não é um número.
Caso passe na validação ele retorna true, caso não passe ele retorna um objeto com a mensagem de erro.
 */