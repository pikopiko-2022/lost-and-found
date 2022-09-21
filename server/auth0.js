const jwt = require('express-jwt')
const jwks = require('jwks-rsa')

// TODO: set the domain and audience (API Identifier)
const domain = 'https://pikopiko-2022-david.au.auth0.com'
const audience = 'https://lost-and-found/api'

const checkJwt = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${domain}/.well-known/jwks.json`,
  }),
  audience: audience,
  issuer: `${domain}/`,
  algorithms: ['RS256'],
})

module.exports = checkJwt


// identifier:  https://lost-and-found/api
// Domain:  pikopiko-2022-david.au.auth0.com
// Client ID:  KJ9CSWBpNRIwuzrEOUWQB6DGniH6RMg2