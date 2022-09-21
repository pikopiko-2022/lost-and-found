const express = require('express')
const request = require('superagent')
require('dotenv').config()

const router = express.Router()

//GET /v1/location

router.get('/', (req, res) => {
  const text = req.query.text

  console.log(text)

  console.log(process.env.GOOGLE_APIKEY)
  return request
    .get('https://maps.googleapis.com/maps/api/place/textsearch/json')
    .query({
      query: text,
      radius: 10000,
      key: process.env.GOOGLE_APIKEY,
    })
    .then((response) => {
      console.log(response.body)
      res.json(response.body.results)
      return null
    })
})

module.exports = router
