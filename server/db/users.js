const connection = require('./connection')

function createUser(user, db = connection) {
  return db('users')
    .insert(user)
    .then(() => getUser(user.auth0Id, db))
}

function getUser(db = connection) {
  return db('users').select()
}

function updateUser(auth0Id, newUserProfile, db = connection) {
  return db('users').where('auth0_id', auth0Id).first().update(newUserProfile)
}

// function updateTask(id, toBeUpdateTask, db = connection) {
//   return db('todos').update({ task: toBeUpdateTask }).where('id', id)
// }
function userExists(name, db = connection) {
  return db('users')
    .where('name', name)
    .then((usersfound) => usersfound.length > 0)
}

function userAuth0IdExist(auth0_id, db = connection) {
  return db('users')
    .where('auth0_id', auth0_id)
    .then((idfound) => idfound.length > 0)
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
  userExists,
  userAuth0IdExist,
}
