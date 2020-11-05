
exports.up = function(knex) {
  return knex.schema
    
  .createTable('permissions', function (table) {
      table.increments('permission_id').primary()
      table.string('name', 50).unique().notNullable()
      table.text('roles')
    })

};

exports.down = function(knex) {
  return knex.schema
      .dropTable("permissions")
};
