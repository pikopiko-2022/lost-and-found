const connection = require('./connection')

function createUser(user, db = connection) {
  return db('users').insert(user)
}

function getUser(db=connection) {
  return db('users').select()
}

function updateUser(newUser, db=connection) {
  return db('users').where('id', newUser).update(newUser)
}

function userExist(username, db=connection) {
  return db('users').where('username', username)
  .then((usersfound) => usersfound.length > 0 )
}

function userCanEdit(id, auth0Id, db = connection) {
  return db('users')
  .where(id, auth0Id)
  .first()
  .then((user) => {
    if (user.added_by_user !== auth0Id) {
      throw new Error('Unauthorized')
    }
  })
}

module.exports = {
  createUser,
  getUser,
  updateUser,
  userCanEdit,
  userExist

}

