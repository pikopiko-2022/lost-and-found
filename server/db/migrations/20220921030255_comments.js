exports.up = function (knex) {
  return knex.schema.createTable('comments', (table) => {
    table.increments('id')
    table.string('commenter_id').references('users.auth0_id')
    table.date('date_commented')
    table.string('comment')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('comments')
}
