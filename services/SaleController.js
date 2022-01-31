const SaleModel = require('../models/SaleModel');

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

