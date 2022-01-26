require('dotenv').config();
const express = require('express');

const app = express();
const bodyParser = require('body-parser');
// const errorMiddleware = require('./middlewares/error');
const ProductController = require('./controllers/ProductController');

const {
  validateProductName,
  validateProductQuantity,
} = require('./middlewares/validations');

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post(
  '/produtcs',
  validateProductName,
  validateProductQuantity,
  ProductController.createProduct,
);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});

// app.use(errorMiddleware);
