exports.seed = function (knex) {
  // Deletes ALL existing entries

  return knex('users').insert([
    {
      id: 1,
      auth0_id: '1',
      name: 'Sally',
      username: 'SillySally',
      email: 'sally@fakemail.com',
      location: 'Christchurch',
    },
    {
      id: 2,
      auth0_id: '2',
      name: 'Fred',
      username: 'FreakyFred',
      email: 'fred@fakemail.com',
      location: 'Tauranga',
    },
    {
      id: 3,
      auth0_id: '3',
      name: 'Tim',
      username: 'TerrificTim',
      email: 'tim@fakemail.com',
      location: 'Auckland',
    },
  ])
}
