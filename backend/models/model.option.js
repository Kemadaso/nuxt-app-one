

module.exports = (sequelize, DataTypes) => {
    var Option = sequelize.define('Option', {
        option_id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        option_name: {type: DataTypes.STRING(50), allowNull: false, unique: true},
        option_value: {type:DataTypes.TEXT, comment: 'value of de option'},
    },{
        timestamps: false,
        tableName: 'options',
        //underscored: true,
        //modelName: 'post'
    })
  
    Option.associate = function(models) {
       
        //Post.belongsTo(models.User, {foreignKey: 'post_user_id'})

    }
  
    return Option
}