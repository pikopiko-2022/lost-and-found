exports.up = function (knex) {
  return knex.schema.createTable('comments', (table) => {
    table.increments('id').primary()
    table.integer('post_id').references('posts.id')
    table.integer('commenter_id').references('users.id')
    table.timestamp('date_commented')
    table.string('comment')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('comments')
}
