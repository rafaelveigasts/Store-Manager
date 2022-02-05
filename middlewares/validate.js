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