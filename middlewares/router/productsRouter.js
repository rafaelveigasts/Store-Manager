const express = require('express');
const rescue = require('express-rescue');

const router = express.Router();
const ProductController = require('../../controllers/ProductController');
const ProductService = require('../../services/ProductService');

const { validateProduct } = ProductService;
const { getAllProducts, getProductById, createProduct } = ProductController;

router.post('/', rescue(validateProduct), rescue(createProduct));
router.get('/:id', rescue(getProductById));
router.get('/', rescue(getAllProducts));

module.exports = router;