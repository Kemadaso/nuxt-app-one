var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(__filename);
var env       = process.env.NODE_ENV || 'development';
//var config    = require(__dirname + '/../config/config.js')[env];
var db        = {};

/*
if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}*/

var sequelize = new Sequelize('exampledb', 'dev001', 'unnamed001', {
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

});


fs.readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    //console.log(Object.getOwnPropertyNames(db[modelName]))
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;




module.exports = db;








