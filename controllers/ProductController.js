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

const getAllProducts = async (req, res) => {
  const allProducts = await ProductModel.getAllProducts();
  res.status(200).json(allProducts);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await ProductModel.findProductById(id);
  if (!product) {
    res.status(404).json({ message: 'Product not found' });
  }
  res.status(200).json(product);
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
};
