

module.exports = (sequelize, DataTypes) => {
    var Term_relationship = sequelize.define('Term_relationship', {
        term_relationship_ID: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        term_id: {type: DataTypes.INTEGER, allowNull: false},
        post_id: {type: DataTypes.INTEGER, allowNull: false},
    },{
        timestamps: false,
        tableName: 'term_relationships',
    })
  
    Term_relationship.associate = function(models) {
       
        //Post.belongsTo(models.User, {foreignKey: 'post_user_id'})

    }
  
    return Term_relationship
}