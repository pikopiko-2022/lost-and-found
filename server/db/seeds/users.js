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
          email: 'sally@fakemail.com',
          location: 'Christchurch',
        },
        {
          auth0_id: '2',
          name: 'Fred',
          email: 'fred@fakemail.com',
          location: 'Tauranga',
        },
        {
          auth0_id: '3',
          name: 'Tim',
          email: 'tim@fakemail.com',
          location: 'Auckland',
        },
      ])
    })
}
