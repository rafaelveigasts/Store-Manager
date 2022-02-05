const checkNameProduct = (req, res, next) => {
  const { body } = req;
  if (!body.name) {
    return res.status(400).json({ message: '"name" is required' });
  }

  const { name } = body;

  if (name.length < 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }

  next();
};

const checkQuantityProduct = (req, res, next) => {
  const { body } = req;

  if (body.quantity === undefined) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  const { quantity } = body;

  if (typeof quantity !== 'number' || quantity <= 0) {
    return res
    .status(422).json({ message: '"quantity" must be a number larger than or equal to 1' });
  }
  next();
};

module.exports = {
  checkNameProduct,
  checkQuantityProduct,
};

/* anotações:

Primeiro validamos se o body não veio vazio, se veio vazio retornamos um erro 400
depois se o campo name tem menos de 5 caracteres retornamos um erro 422
chamamos o next para poder carregar o próximo middleware

depois validamos se o body.quantity é undefined, se for retornamos um erro 400
depois validamos se o body.quantity é um número, se for retornamos um erro 422
chamamos o next para poder carregar o próximo middleware
*/