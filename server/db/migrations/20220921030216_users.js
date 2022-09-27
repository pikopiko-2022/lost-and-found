exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary()
    table.string('auth0_id')
    table.string('name')
    table.string('username')
    table.string('email')
    table.string('location')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('users')
}
