

module.exports = (sequelize, DataTypes) => {
    var Comment = sequelize.define('Comment', {
        comment_ID: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        comment_post_ID: {type: DataTypes.INTEGER, allowNull: false},
        comment_user_email: {type:DataTypes.STRING(50), comment: 'correo opcional'},
        comment_user_ip: DataTypes.STRING(50),
        comment_content: {type: DataTypes.TEXT},
        comment_approved: {type:DataTypes.STRING(50), allowNull: false, defaultValue: "approved", comment: 'estados: approved, unapproved, spam, trash'},
        comment_agent: {type:DataTypes.STRING(300), comment:"info useragent about author comment"},
        comment_type: {type:DataTypes.STRING(50), defaultValue: 0},
        comment_parent: {type:DataTypes.INTEGER},
        user_id:{type:DataTypes.INTEGER, comment: "user id relation"},
    },{
        timestamps: true,
        tableName: 'comments',
        //underscored: true,
        //modelName: 'post'
    })
  
    Comment.associate = function(models) {
       
        //Post.belongsTo(models.User, {foreignKey: 'post_user_id'})

    }
  
    return Comment
}