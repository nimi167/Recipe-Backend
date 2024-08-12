const jwt = require('jsonwebtoken');
const JWT_SECRET = "Recipe";

const generateToken = (data) => {
  return jwt.sign(data, JWT_SECRET);
};

module.exports = { generateToken };
