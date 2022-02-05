const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const ControlerProduct = require('./controllers/Product');
const ControllerSale = require('./controllers/Sale');

const app = express();
app.use(bodyParser.json());

const { 
  checkNameProduct, 
  checkQuantityProduct,
} = require('./middlewares/validate');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', ControlerProduct.getAll);
app.get('/products/:id', ControlerProduct.findById);
app.get('/sales', ControllerSale.getAll);
app.get('/sales/:id', ControllerSale.getById);

app.post(
  '/products',
   checkNameProduct, 
   checkQuantityProduct, 
   ControlerProduct.create,
);

app.post(
  '/sales',
  ControllerSale.createSales,
);

app.put(
  '/products/:id',
  checkNameProduct,
  checkQuantityProduct,
  ControlerProduct.update,
);
app.put(
  '/sales/:id',
  ControllerSale.update,
);

app.delete('/products/:id', ControlerProduct.deleteProduct);
app.delete('/sales/:id', ControllerSale.deleteSale);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
/* 
Detalhe importante: ao fazer o update do item, primeiro verificar a quantidade depois o nome
Pois nesse caso o é o que se adequa ao requisito. 

O delete não precisa tanto de validação, pois não tem nome nem quantidade só o id interessa.
*/
