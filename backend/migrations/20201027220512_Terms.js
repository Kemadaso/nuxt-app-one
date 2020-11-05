
exports.up = function(knex) {
  return knex.schema
    
  .createTable('terms', function (table) {
      table.increments('term_id').primary()
      table.string('taxonomy', 50).notNullable()
      table.string('term_name').notNullable()
      table.string('term_slug', 50).unique().notNullable()
      table.integer('term_parent')
      table.integer('term_order').defaultTo(0)
      table.string('term_status', 50).notNullable()
      table.text('term_content')

    })

};

exports.down = function(knex) {
  return knex.schema
      .dropTable("terms")
};
