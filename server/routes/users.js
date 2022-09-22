const express = require('express')
const checkJwt = require('../auth0')
const db = require('../db/users')
const router = express.Router()

// GET api/v1/users
router.get('/', checkJwt, (req, res) => {
  const auth0_id = req.user?.sub
  if (!auth0_id) {
    res.send(null)
  } else {
    db.getUsers()
      .then((user) => {
        res.json(user ? user : null)
      })
      .catch((err) => res.status(500).send(err.message))
  }
})

// POST createUser
router.post('/', checkJwt, (req, res) => {
  const auth0_id = req.user?.sub
  const { name, username, email, location } = req.body
  const userDetails = {
    auth0_id,
    username,
    email,
    location,
    name,
  }

  db.userExists(name)
    .then((usernameTaken) => {
      if (usernameTaken) throw new Error('Username taken')
      return db.userAuth0IdExist(auth0_id)
    })
    .then((userAuth0IdTaken) => {
      if (userAuth0IdTaken) throw new Error('Auth0Id already exist')
      return db.createUser(userDetails)
    })
    .then((userDetails) => res.json(userDetails))
    .catch((err) => {
      console.error(err)
      if (err.message === 'Username taken') {
        res.status(403).send('Username taken')
      } else if (err.message === 'Auth0Id already exist') {
        res.status(403).send('Auth0Id already exist')
      } else {
        res.status(500).send(err.message)
      }
    })
})

router.patch('/', checkJwt, (req, res) => {
  const auth0_id = req.user?.sub
  const { username, email, location } = req.body
  const userDetails = {
    email,
    location,
    username,
  }
  db.updateUser(auth0_id, userDetails)
    .then(() => res.json(userDetails))
    .catch((err) => console.error(err))
})

module.exports = router
