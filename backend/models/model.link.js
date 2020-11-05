
module.exports = (sequelize, DataTypes) => {

  var Link = sequelize.define('Link', {
      link_id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
      link_postID: {type: DataTypes.INTEGER, allowNull: false},
      link_group: {type:DataTypes.TEXT, comment: '[JSON]'},
      link_type: {type: DataTypes.STRING(50), allowNull: false, comment: 'download, online, iframe'},
      link_state: {type: DataTypes.STRING(50), allowNull: false, comment: 'active, disabled'},
      link_view: {type: DataTypes.INTEGER, defaultValue: 0},
      link_order: {type: DataTypes.INTEGER, defaultValue: 0 }
  },{
      timestamps: true,
      tableName: 'links',
      //underscored: true,
      //modelName: 'post'
  })

  Link.associate = function(models) {
     

  }

  return Link
}
