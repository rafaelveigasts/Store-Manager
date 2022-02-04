require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// const errorMiddleware = require('./middlewares/error');
const ProductController = require('./controllers/ProductController');
const SaleController = require('./controllers/SaleController');

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
app.get('/sales', SaleController.getAllSales);
app.get('/sales/:id', SaleController.getSaleById);

app.post(
  '/products',
  validateProductName,
  validateProductQuantity,
  ProductController.createProduct,
);

app.post('/sales', SaleController.createSale);

app.put(
  '/products/:id',
  validateProductQuantity,
  validateProductName,
  ProductController.updateProductById,
);

app.put(
  '/sales/:id',
  SaleController.updateSaleById,
);

app.delete('/products/:id', ProductController.deleteProductById);

app.delete('/sales/:id', SaleController.deleteSaleById);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});

// app.use(errorMiddleware);

/* 
Detalhe importante: ao fazer o update do item, primeiro verificar a quantidade depois o nome
Pois nesse caso o é o que se adequa ao requisito. 

O delete não precisa tanto de validação, pois não tem nome nem quantidade só o id interessa.
*/
