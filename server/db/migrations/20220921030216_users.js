exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.string('auth0_id').primary()
    table.string('name')
    table.string('email')
    table.string('location')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('users')
}
