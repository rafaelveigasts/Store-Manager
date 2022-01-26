const ProductModel = require('../models/ProductModel');

const validateName = async (name) => {
  const allProducts = await ProductModel.getAllProducts();
  const productName = allProducts.find((product) => product.name === name);

  if (!productName) {
    return { status: 400, message: '"name" is required' };
  }
  if (productName.lenght < 5) {
    return {
      status: 400,
      message: '"name" must be at least 5 characters long',
    };
  }
  if (productName) return { status: 409, message: 'Product already exists' };
};

const validateProductQuantity = async (quantity) => {
  if (!quantity || quantity < 1) {
    return { status: 400, message: '"quantity" is required' };
  }
  if (typeof quantity !== 'number') {
    return {
      status: 400,
      message: '"quantity" must be a numbeer larger then or equal to 1',
    };
  }
  return { status: 200, message: 'Quantity is Valid' };
};

const validateProduct = async (req, res, next) => {
  const { name, quantity } = req.body;
  const { status: nameStatus, message: nameMessage } = await validateName(name);
  const { status: quantityStatus, message: quantityMessage } = validateProductQuantity(quantity);
  if (nameStatus !== 200) {
    return res.status(nameStatus).json({ message: nameMessage });
  }

  if (quantityStatus !== 200) {
    return res.status(quantityStatus).json({ message: quantityMessage });
  }
  next();
};

module.exports = {
  validateName,
  validateProductQuantity,
  validateProduct,
};
