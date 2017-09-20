require('dotenv').config()

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/battle_code'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }

};
