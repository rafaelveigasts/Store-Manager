const validateProductName = (req, res, next) => {
  const { name } = req.body;

  // quando não é passado o name
  if (!name) {
    return res.status(400).json({
      message: '"name" is required',
    });
  }

  // quando o name é menor que 5 caracteres e não é uma string
  if (name.length < 5 || typeof name !== 'string') {
    return res
      .status(422)
      .json({ message: '"name" length must be at least 5 characters long' });
  }
  next();
};

const validateProductQuantity = (req, res, next) => {
  const { quantity } = req.body;

  // quando não é passado o quantity
  if (quantity === undefined) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  // quando o quantity é menor que 1 e não é um número
  if (quantity <= 0 || typeof quantity !== 'number') {
    return res
      .status(422)
      .json({ message: '"quantity" must be a number larger or equal to 1' });
  }
  next();
};

module.exports = {
  validateProductName,
  validateProductQuantity,
};
