const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: "30d",
    }
  );
};

module.exports = generateToken;
