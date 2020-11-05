module.exports = (sequelize, DataTypes) => {

  var Permission = sequelize.define('Permission', {
    name: {
      type: DataTypes.STRING(50),
      AllowNull: false,
      unique: true,
      validate: {
        len: {
          args: [3, 50]
        }
      }
    },
    roles: {
      type: DataTypes.TEXT,
      AllowNull: true,
    },
  }, {
    timestamps: false,
    tableName: 'permissions',
  })

  Permission.associate = function (models) {
    //Post.belongsTo(models.User, {foreignKey: 'post_user_id'})
  }

  

  Permission.makesomething = function () {
    console.log('makesomething')
  }

  Permission.promise = async function () {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('lo hice')
      }, 2000)
    })
  }

  return Permission
  
}