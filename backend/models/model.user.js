const helper = require("../libs/helper")

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    user_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nickname: {
      type: DataTypes.STRING(20),
      unique: true,
      allowNull: false,
      validate: {
        len: [4, 20],
        is: /^[a-zA-Z0-9_@\.]+$/
      }
    },
    firstname: {
      type: DataTypes.STRING(50),
      allowNull: true,
      validate: {
        len: [3, 20],
        is: /^[a-zA-Z\s]+$/
      }
    },
    lastname: {
      type: DataTypes.STRING(50),
      allowNull: true,
      validate: {
        len: [3, 20],
        is: /^[a-zA-Z\s]+$/
      }
    },
    is_active: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: 'Estados: 0, 1, 2',
      validate: {
        isIn: [[0, 1, 2]]
      }
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      comment: 'correo necesario',
      validate: {
        isEmail: true
      }
    },
    email_token: {
      type: DataTypes.STRING(200),
      comment: 'token de confirmacion email'
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: "password encrypted",
      validate: {
        not: /^[\s]+$/i,
        len: [6, 100]
      }
    },
    roles: {
      type: DataTypes.TEXT,
      comment: '[Array roles]'
    },
    group_permission: {
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: 'group permissions',
      validate: {
        isAlpha: true
      }
    }
  }, {
    timestamps: true,
    tableName: 'users',
    //underscored: true,
    //modelName: 'user'
  })

  User.associate = function (models) {

    //User.hasMany(models.Post)
  }

  User.isLogin = () => {

  }

  User.register = () => {

  }

  User.exists = () => {

  }

  User.getRoles = async (user_id = null) => {

    //console.log(sequelize)
    if(!false) {
      //const user_id = user_id
    }

    try {
      const sql = `
        SELECT permissions.roles roles1, users.roles as roles2, users.user_id FROM users
          LEFT JOIN permissions
            ON permissions.name = users.group_permission
        WHERE 
          users.user_id = ${user_id}
      `
      let result = await sequelize.query(sql, { type: sequelize.QueryTypes.SELECT })
      let rol = JSON.parse(result[0].roles1)
      let rol2 = JSON.parse(result[0].roles2)

      rol2 = rol2.filter(r => rol.indexOf(r) > -1)

      // Not forget to make merge roles
      rol = [...rol, ...rol2]
      return rol
    } catch (error) {
      return []
    }

  }

  User.hasRoles = async (arr = []) => {
    const roles = await User.getRoles()
    try {
      if (helper.isArrayNoEmpty(arr)) {
        for (const iterator of arr) {
          if (!roles.includes(iterator)) {
            return false
          }
        }
        return true
      }
    } catch (error) {
      return false
    }

  }

  User.getGroup = async () => {
    try {
      const user = await User.findByPk(1)
      return user.group_permission
    } catch (error) {
      return null
    }
  }

  User.isSuperUser = () => {
    if (1 == 1) {
      return true
    }
  }

  User.isBanned = () => {

  }

  User.hasActiveAccount = async () => {
    try {
      const user = await User.findOne({ where: { user_id: 1 } })
      if (user.is_active == 1) {
        return true
      }
    } catch (error) {

    }
  }


  return User

}
