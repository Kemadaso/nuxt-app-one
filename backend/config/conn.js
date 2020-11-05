
//require('dotenv').config()

var knex = require('knex')({
  client: 'mysql2',
  connection: {
    host : process.env.DBHOST,
    user : process.env.DBUSER,
    password : process.env.DBPASS,
    database : process.env.DBNAME
  },
  migrations: {
    tableName: 'migrations'
  }
})

module.exports = knex