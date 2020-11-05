
exports.up = function(knex) {
  return knex.schema
    
  .createTable('options', function (table) {
      table.increments('option_id').primary()
      table.string('option_name', 50).unique().notNullable()
      table.text('option_value')
    })

};

exports.down = function(knex) {
  return knex.schema
      .dropTable("options")
};
