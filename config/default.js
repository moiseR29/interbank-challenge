require('dotenv').config();

module.exports = {
  env: process.env.NODE_ENV,
  server: {
    port: process.env.PORT,
    key: process.env.SERVER_SECRET_KEY,
  },
};
