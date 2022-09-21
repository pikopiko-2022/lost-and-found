exports.up = function (knex) {
  return knex.schema.createTable('posts', (table) => {
    table.increments('id')
    table.string('uploader_id').references('users.auth0_id')
    table.string('category')
    table.string('title')
    table.string('date')
    table.string('description')
    table.string('image_url')
    table.string('location')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('posts')
}
