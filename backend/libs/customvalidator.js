const validate = require('validate.js')
const conn = require('../config/conn')


validate.validators.is_unique = function(value, options, key, attributes) {
  //console.log(value, options)
  return new validate.Promise(function(resolve, reject) {

    conn.where(options.column, value)
        .from(options.table)
        .first()
        .then((id) => {
          if(typeof id != 'undefined') {
            resolve(` must be unique in ${options.table}.${options.column}`)
          } else {
            resolve()
          }
                    
        })
        .catch((error) => {
          resolve(error)
        })

  })

}

validate.validators.exists_in = function(value, options, key, attributes) {
  //console.log(value, options)
  return new validate.Promise(function(resolve, reject) {

    conn.where(options.column, value)
        .from(options.table)
        .first()
        .then((id) => {
          if(typeof id == 'undefined') {
            resolve(`${value} not exists  in ${options.table}.${options.column}`)
          } else {
            resolve()
          }
                    
        })
        .catch((error) => {
          resolve(error)
        })

  })

}


module.exports = validate