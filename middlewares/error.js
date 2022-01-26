module.exports = (err, req, res, _next) => {
  if (err.isJoi) {
    return res.status(400).json({
      status: 'error',
      message: err.details[0].message,
    });
  }

  const statusByErrorCode = {
    notFound: 404,
    alreadyexists: 409,
    badRequest: 400,
    unauthorized: 401,
    forbidden: 403,
    internalServerError: 500,
  };

  const status = statusByErrorCode[err.code] || 500;

  return res.status(status).json({
    error: { message: err.message },
  });
};
