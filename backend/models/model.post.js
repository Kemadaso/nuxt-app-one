
module.exports = (sequelize, DataTypes) => {

    var Post = sequelize.define('Post', {
        post_id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        post_title: {type: DataTypes.STRING(300), allowNull: false},
        post_slug: {type:DataTypes.STRING(300), allowNull: false, unique:true, comment: 'correo necesario'},
        post_type: {type: DataTypes.STRING(50), allowNull: false, comment: 'pelicula'},
        post_content: DataTypes.TEXT,
        post_format: {type: DataTypes.STRING(50), allowNull: false, comment: 'generator, editor'},
        post_status: {type:DataTypes.STRING(50), allowNull: false, defaultValue: "publish", comment: 'estados: publish, draft, trash'},
        comment_status: {type:DataTypes.STRING(50), allowNull:false, defaultValue: "open", comment:"status:open,closed"},
        comment_count: {type:DataTypes.INTEGER, defaultValue: 0},
        post_user: {
            type: DataTypes.INTEGER, 
            comment: "user id relation",
        }

    },{
        timestamps: true,
        tableName: 'posts',
        //underscored: true,
        //modelName: 'post'
    })
  
    Post.associate = function(models) {
       
        //Post.belongsTo(models.User, {foreignKey: 'post_user_id'})

    }
  
    return Post
}

/**
 * 
 * 
 * 
 * 
 * 
 * 
 */