
exports.up = function(knex) {
  return knex.schema
    
  .createTable('comments', function (table) {
      table.increments('comment_id').primary()
      table.string('comment_post_id', 50).notNullable()
      table.string('comment_user_email', 50)
      table.string('comment_user_ip', 50)
      table.text('comment_content')
      table.string('comment_approved', 50).notNullable()
      table.string('comment_agent', 300)
      table.string('comment_status', 50).notNullable()
      table.integer('comment_parent')
      table.integer('comment_user').notNullable()
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())

    })

};

exports.down = function(knex) {
  return knex.schema
      .dropTable("comments")
};
