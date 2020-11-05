
exports.up = function(knex) {
  return knex.schema
    
  .createTable('links', function (table) {
      table.increments('link_id').primary()
      table.string('link_post_id', 50).notNullable()
      table.integer('link_user_id').notNullable()
      table.text('link_content')
      table.string('link_type', 50).notNullable()
      table.string('link_status', 50).notNullable()
      table.integer('link_view').defaultTo(0)
      table.integer('link_order').defaultTo(0)
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())

    })

};

exports.down = function(knex) {
  return knex.schema
      .dropTable("links")
};
