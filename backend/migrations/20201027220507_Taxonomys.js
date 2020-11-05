
exports.up = function(knex) {
  return knex.schema
    
  .createTable('taxonomys', function (table) {
      table.increments('taxonomy_id').primary()
      table.string('taxonomy_name', 50).unique().notNullable()
      table.text('taxonomy_description')
    })

};

exports.down = function(knex) {
  return knex.schema
      .dropTable("taxonomys")
};
