

module.exports = (sequelize, DataTypes) => {
    var Taxonomy = sequelize.define('Taxonomy', {
        taxonomy_id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        taxonomy_name: {type: DataTypes.STRING(50), allowNull: false, unique: true},
        taxonomy_description: {type: DataTypes.STRING(300), allowNull: true},
    },{
        timestamps: false,
        tableName: 'taxonomys',
    })
  
    Taxonomy.associate = function(models) {
       
        //Post.belongsTo(models.User, {foreignKey: 'post_user_id'})

    }
  
    return Taxonomy
}