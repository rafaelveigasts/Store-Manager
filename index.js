require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// const errorMiddleware = require('./middlewares/error');
const ProductController = require('./controllers/ProductController');

const {
  validateProductName,
  validateProductQuantity,
} = require('./middlewares/validations');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', ProductController.getAllProducts);
app.get('/products/:id', ProductController.findProductById);

app.post(
  '/products',
  validateProductName,
  validateProductQuantity,
  ProductController.createProduct,
);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});

// app.use(errorMiddleware);
