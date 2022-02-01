const checkProperty = (array) => {
  const hasUndefinedKey = array.some((sale) => sale.product_id === undefined);
  if (hasUndefinedKey) {
    return { code: 400, message: { message: '"product_id" is required' } }; 
}
  const hasEmptyQuantity = array.some((sale) => sale.quantity === undefined);
  if (hasEmptyQuantity) {
    return { code: 400, message: { message: '"quantity" is required' } };
  }
  const hasNegativeQuantity = array.some((sale) =>
    (sale.quantity <= 0 || sale.quantity !== 'number'));
  if (hasNegativeQuantity) {
    return {
      code: 422,
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