
var fs   = require('fs')
var path = require('path')
var conn = require('../config/conn')

var basename  = path.basename(__filename)

var model = {}


fs.readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
  })
  .forEach(file => {

    const namefile = file.replace('model.', '').replace('.js', '');

    //var model = sequelize['import'](path.join(__dirname, file))
    //db[model.name] = model
    //console.log(namefile)
    let modelclass = require(path.join(__dirname, file))
    model[namefile] = new modelclass(conn)

  })


//db.sequelize = sequelize

module.exports = model
