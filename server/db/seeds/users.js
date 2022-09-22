exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          auth0_id: '1',
          name: 'Sally',
          username: 'SillySally',
          email: 'sally@fakemail.com',
          location: 'Christchurch',
        },
        {
          auth0_id: '2',
          name: 'Fred',
          username: 'FreakyFred',
          email: 'fred@fakemail.com',
          location: 'Tauranga',
        },
        {
          auth0_id: '3',
          name: 'Tim',
          username: 'TerrificTim',
          email: 'tim@fakemail.com',
          location: 'Auckland',
        },
      ])
    })
}
