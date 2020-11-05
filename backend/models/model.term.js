

module.exports = (sequelize, DataTypes) => {
    var Term = sequelize.define('Term', {
        term_id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        taxonomy: {type: DataTypes.STRING(50), allowNull: false},
        term_name: {type: DataTypes.STRING(50), allowNull: false, unique: true},
        term_slug: {type: DataTypes.STRING(50), allowNull: false, unique: true},
        term_parent: {type: DataTypes.INTEGER, allowNull: true, comment:"term_ID parent"},
        term_orden: {type: DataTypes.INTEGER},
        term_active: {type: DataTypes.STRING(50), allowNull: false, defaultValue: "active", commnet:"active: active, unabled"},

    },{
        timestamps: false,
        tableName: 'terms',
    })
  
    Term.associate = function(models) {
       
        //Post.belongsTo(models.User, {foreignKey: 'post_user_id'})

    }
  
    return Term
}