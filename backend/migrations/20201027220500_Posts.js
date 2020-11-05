
exports.up = function(knex) {
  return knex.schema
    
  .createTable('posts', function (table) {
      table.increments('post_id').primary()
      table.string('post_title', 50).notNullable()
      table.string('post_slug').unique().notNullable()
      table.string('post_type', 50).notNullable()
      table.text('post_content')
      table.string('post_status', 50).notNullable()
      table.integer('post_user').notNullable()
      table.string('comment_status', 50)
      table.integer('comment_count').defaultTo(0)
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())

    })

};

exports.down = function(knex) {
  return knex.schema
      .dropTable("posts")
};
