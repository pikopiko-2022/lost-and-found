const connection = require('./connection')

function createUser(user, db = connection) {
  return db('users')
    .insert(user)
    .then(() => getUserById(user.auth0_id, db))
}

function getUserById(auth0_id, db = connection) {
  return db('users').where('auth0_id', auth0_id).first()
}

function getUsers(db = connection) {
  return db('users').select()
}

function updateUser(auth0_id, newUserProfile, db = connection) {
  return db('users').where('auth0_id', auth0_id).first().update(newUserProfile)
}

function userExists(username, db = connection) {
  return db('users')
    .where('username', username)
    .then((usersfound) => usersfound.length > 0)
}

function userAuth0IdExist(auth0_id, db = connection) {
  return db('users')
    .where('auth0_id', auth0_id)
    .then((idfound) => idfound.length > 0)
}

module.exports = {
  createUser,
  getUsers,
  updateUser,
  userExists,
  userAuth0IdExist,
  getUserById,
}
