const ProductModel = require('../models/ProductModel');

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const newID = await ProductModel.createProduct({ name, quantity });
  res.status(201).json({
    id: newID,
    name,
    quantity,
  });
};

module.exports = {
  createProduct,
};
