// Update with your config settings.
require('dotenv').config()

module.exports = {

  development: {
    client: 'mysql2',
    connection: {
      host : process.env.DBHOST,
      user : process.env.DBUSER,
      password : process.env.DBPASS,
      database : process.env.DBNAME
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  /*
  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    }
  },*/

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
