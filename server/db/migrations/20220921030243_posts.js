exports.up = function (knex) {
  return knex.schema.createTable('posts', (table) => {
    table.increments('id').primary()
    table.integer('uploader_id').references('users.id')
    table.string('category')
    table.string('title')
    table.string('date_lostOrFound')
    table.timestamp('date_posted')
    table.string('description')
    table.string('image_url')
    table.string('location')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('posts')
}
