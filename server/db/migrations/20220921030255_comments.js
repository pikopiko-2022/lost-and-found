exports.up = function (knex) {
  return knex.schema.createTable('comments', (table) => {
    table.increments('id')
    table.integer('post_id').references('posts.id')
    table.string('commenter_id')
    // .references('users.id')
    table.date('date_commented')
    table.string('comment')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('comments')
}
