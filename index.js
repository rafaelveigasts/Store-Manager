require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');
const Product = require('./controllers/ProductController');

const app = express();
const errorMiddleware = require('./middlewares/error');

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', rescue(Product.createProduct));

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});

app.use(errorMiddleware);