
const {Sequelize} = require('sequelize')
 
let connexion = new Sequelize('exampledb', 'dev001', 'unnamed001', {
    host: 'localhost',
    dialect: 'mysql',
    // similar for sync: you can define this to always force sync for models
    //sync: { force: true },

    // pool configuration used to pool database connections
    pool: {
        max: 100,
        idle: 30000,
        acquire: 60000,
    },

    //port: 12345,
    logging: false,
})

module.exports = connexion


