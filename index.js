require('dotenv').config();
const express = require('express');

const app = express();
const errorMiddleware = require('./middlewares/error');

const ProductsRouter = require('./middlewares/router/productsRouter');

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/produtcs', ProductsRouter);
app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});

app.use(errorMiddleware);