// 📄 위치: backend-node/middlewares/validate.js

module.exports = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    next();
  };
};
