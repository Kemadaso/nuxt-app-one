const model     = require('../models')
const helper    = require('../libs/helper')
let validate    = require('../libs/validate')
const rules     = require('../libs/rulesvalidate')




const sequelize = model.sequelize


exports.find = async function(req, res, next) {
    try {
        
        if(req.params.id == undefined) throw ({error: "parametro no existe"})

        const user = await model.User.findByPk(req.params.id)

        try {
            user.roles = JSON.parse(user.roles)
        } catch (error) {
            user.roles = []
        }

        if(helper.isObjectEmpty(user)) throw ({error: "usuario no existe"})

        res.json(user)
        
    } catch (error) {
        res.json(error)
    }
   
}

exports.create = async function(req, res, next) {

    try {
        
        let checked = req.body
        
        checked.nickname         = checked.email.split('@')[0]
        checked.password         = await helper.encrypt(checked.password)
        checked.email_token      = await helper.encrypt(checked.email)
        checked.is_active        = 1
        checked.roles            = "[]"
        checked.group_permission = "administrator"

        console.log(checked)

        try {
            let user = await model.User.create(checked)
            return res.json(user)
        } catch (error) {
            return res.json({"error": error.errors[0].message})
        }

    } catch (error) {
        console.log(error)
        res.json(error)
    }


}


exports.all = async function(req, res, next) {

    try {

        let orderby, order, where
        let limit    = req.queryInt('per_page')
        let offset   = req.queryInt('paged')
        orderby  = req.queryString('orderby')
        order    = req.queryString('order')
        where    = helper.sanitizeWhereQuery(req.queryString('where'))
        

        const field = [
            'user_id',
            'nickname',
            'firstname',
            'lastname',
            'email',
            'is_active',
            'roles',
            'group_permission',
            'createdAt',
            'updatedAt'
        ]

        let sql = "SELECT "+ field.join(',') +" FROM users "
        
        if(where) {
            sql += " WHERE " + where + " "
        }

        if(helper.inArray(orderby, field)) {
            //if(typeof order === 'undefined') order = ''
            const param = (helper.inArray(order.toUpperCase(),['DESC', 'ASC']) ? order.toUpperCase() : 'DESC')
            sql += " ORDER BY " + orderby + " " + param + " "
        }

        let total = await sequelize.query(sql, {type: sequelize.QueryTypes.SELECT})
        total = total.length || 0

        if(offset >= 0 && limit > 0 ) {
            offset = (limit * offset) - limit
            sql += "LIMIT " + limit + " OFFSET " + offset + " "
        }

            
        let result = await sequelize.query(sql, {type: sequelize.QueryTypes.SELECT})
        //if(helper.isArrayEmpty(result)) throw ({error: "resultado no encontrado ", sql})

        //let users = await model.User.findAll({where:{firstname: "juan"}, offset: 0, limit: 10})
        let all = result
        res.json({total, result})

    } catch (error) {
        console.log(error)
        res.json(error)
        
    }
}

exports.update = async function(req, res, next) {

    console.log(req.body)

    try {
        
        let user = await model.User.findByPk(req.body.user_id)
        if(!user) throw ({error: "usuario no existe"})

        
        if(req.body.email) {
            user.email = req.body.email
        } else if(req.body.nickname) {
            user.nickname = req.body.nickname
        } else if(req.body.group_permission) {
            user.group_permission = req.body.group_permission
        } else if(req.body.roles) {
            try {
                user.roles = JSON.stringify(req.body.roles)
            } catch (error) {
                user.roles = JSON.stringify([])
            }
        } else if(req.body.oldpassword && req.body.password && req.body.repassword) {
            const match = await helper.decrypt(req.body.oldpassword, user.password)
            //console.log(match)
            if(match) {
                user.password = await helper.encrypt(req.body.password)
            } else {
                throw {error: "tu contraseña no es valida"}
            }

        }

        const data = await user.save()
        //console.log(data)
        res.json(data)

       
            
    } catch (error) {
        console.log(error)
        res.json(error)
    }


}

exports.validuserlogin  = async function (req,res,next) {
    console.log(req.body)
    try {
        let user = await model.User.findByPk(req.body.user_id)
        if(!user) throw {success: false }

        const match = await helper.decrypt(req.body.password, user.password)
        if(match) {
            res.json({success: true})
        } else {
            res.json({success: false})
        }

        
        
    } catch (err) {
        res.json(err)
    }


}


exports.exists = async function(req, res, next) {
    try {
        let send = {}
        if(req.body.email) {
            send.email = req.body.email
        } else if(req.body.nickname) {
            send.nickname = req.body.nickname
        } else if(req.body.user_id) {
            send.user_id = req.body.user_id
        }

        if(helper.isObjectNoEmpty(send)) {
            let user = await model.User.findOne({where:{...send}})
            if(!user) throw ({success: false})
            res.json({success: true})
        }
        
    } catch (error) {
        res.json(error)
    }
}

exports.delete = async function(req, res, next) {
    try {
        
        let user = await model.User.findByPk(req.body.user_id)
        if(!user) throw ({error: "usuario no existe"})


    } catch (error) {
        res.json(error)
    }
}

exports.backendcreate = async function(req, res, next) {
    try {
        
        let checked = req.body

        //console.log(checked)
        
        checked.nickname         = checked.nickname
        checked.password         = await helper.encrypt(checked.password)
        checked.email_token      = await helper.encrypt(checked.email)
        if(req.body.fromadmin) {
            checked.is_active        = req.body.is_active
            checked.group_permission = req.body.group_permission
            checked.roles = JSON.stringify(req.body.roles)
        } else {
            checked.is_active        = 1
            checked.roles            = "[]"
            checked.group_permission = "publisher"
        }

        //console.log(checked)

        //return res.json({success: true})

        try {
            let user = await model.User.create(checked)
            return res.json({success: true, user})
        } catch (error) {
            return res.json({"error": error.errors[0].message})
        }

    } catch (error) {
        console.log(error)
        res.json(error)
    }
}

exports.backendrecoverpass = async function(req, res, next) {
    try {
        
        let user = await model.User.findByPk(req.body.user_id)

        /* Use send Mailer to send data to recover you password */

        if(!user) throw ({error: "user don't exists"})
        res.json({success: 'email submit'})

    } catch (error) {
        res.json(error)
    }
}

exports.backendlogin = async function (req, res, next) {

    try {
      let user = await model.User.findOne({ where: { email: req.body.email } })
      const match = await helper.decrypt(req.body.password, user.password)
      if (match) {
        /*{
          user_id: user.user_id,
          fistname: user.fistname,
          lastname: user.lastname,
          email: user.email
        } */
  
        var fs = require('fs')
        var path = require('path');
        let keyp = fs.readFileSync(path.join(__dirname, '../config/private.key'))
  
        //console.log(keyp)
        //"2 days", "10h", "7d"
        let s = jwt.sign({
          user_id: user.user_id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email
        }, keyp, { algorithm: 'RS256', expiresIn: 6 * 60 * 60 }, function (error, user_access_token) {
          if(error) {
            res.json({error})
          } else {
            res.json({ user, user_access_token })
          }
          
        })
  
      } else {
        res.json({ error: "usuario o contraseña incorrectos" })
      }
  
    } catch (error) {
      res.json({error: error.errors[0].message})
    }
  
}