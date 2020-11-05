const bcrypt = require('bcrypt')
const saltRounds = 10


exports.encrypt = async function (textpassword) {
    return await bcrypt.hash(textpassword, saltRounds)
}

exports.decrypt = async function (textpassword, hash) {
    return await bcrypt.compare(textpassword, hash)
}

