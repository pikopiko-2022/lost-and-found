const express = require('express')
const checkJwt = require('../auth0')
const db = require('../db/users')
const router = express.Router()

// GET api/v1/users
router.get('/', checkJwt, (req, res) => {
  const auth0_id = 1
  if (!auth0_id) {
    res.send(null)
  } else {
    db.getUser(auth0_id)
    db.getUser()
      .then((user) => {
        res.json(user ? user : null)
      })
      .catch((err) => res.status(500).send(err.message))
  }
})

// POST createUser
//const auth0_id = req.user?.sub
router.post('/', checkJwt, (req, res) => {
  const auth0_id = 13
  const { name, email, location } = req.body
  const userDetails = {
    auth0_id,
    name,
    email,
    location,
  }
  // eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InE2M2pDVUttS1g5a2xnR2ZPeEtLeCJ9.eyJpc3MiOiJodHRwczovL3Bpa29waWtvLTIwMjItZGF2aWQuYXUuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDYzMTdlNDVkYWVlZmUwMTRmN2E0MDNjZiIsImF1ZCI6WyJodHRwczovL2xvc3QtYW5kLWZvdW5kL2FwaSIsImh0dHBzOi8vcGlrb3Bpa28tMjAyMi1kYXZpZC5hdS5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjYzODEyNTA0LCJleHAiOjE2NjM4OTg5MDQsImF6cCI6IktKOUNTV0JwTlJJd3V6ckVPVVdRQjZER25pSDZSTWcyIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCJ9.6wu13waIHjc8iQtSKhzdsJfZnVD7WeCaLhxLpV6UhbTaQAlghUjWO8kOCuCy6xp6iN4Y1OwU5KUlrSXB8jQmMYXUHG24MtxE-52JP-t8i-cIBXavuTybC-_DgxM6zfUMj2qvu4wk-PbFOc9rqIH0WX9ovDdLg3UhrM5PeuC3nuYZuea1nnsAkaPF_JL7iJYtMeN26zUJYRCZ8DhbLY9OnkDyck88pE0hLTIT0UsFkXVisx5uLxGS9ivJTG-M4h1N0OW05RUAEZTFmocmnTS4AIcsc9P9byBlYxbi3BrJ81f27KOrP8g55R7bJWdf1NL2A-UsvQ1H8Jyh8XAbzL4-sQ
  // check if username exist already and
  // check if we have copy of auth0Id is in our database

  db.userExists(name)
    .then((usernameTaken) => {
      if (usernameTaken) throw new Error('Username taken')
    })
    .then(
      db.userAuth0IdExist(auth0_id).then((userAuth0IdTaken) => {
        if (userAuth0IdTaken) throw new Error('Auth0Id already exist')
      })
    )
    .then(() => db.createUser(userDetails))
    .then(() => res.sendStatus(201))
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

// .patch for updating user profile
//add checkJwt below, username when chelsea's done with user db
router.patch('/', checkJwt, (req, res) => {
  const auth0_id = req.user?.sub
  // const auth0_id = 1
  const { name, email, location } = req.body
  const userDetails = {
    name,
    email,
    location,
  }
  db.updateUser(auth0_id, userDetails)
    .then(() => res.sendStatus(200))
    .catch((err) => console.error(err))
})

module.exports = router
