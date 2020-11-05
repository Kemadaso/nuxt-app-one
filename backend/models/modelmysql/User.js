const Model = require('./Model')
const { async } = require('validate.js')


class User {

  static async getUser() {
    
    const ccc = await Model
    const [rows, fields] = await ccc.execute('select * from users')

    return rows

  }

}

module.exports = User