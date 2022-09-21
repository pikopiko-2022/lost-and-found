import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

function LandingPage() {
  const { loginWithRedirect } = useAuth0()
  function handleSignIn(e) {
    e.preventDefault()
    loginWithRedirect()
  }
  return (
    <>
      <section>
        <div>
          <button onClick={handleSignIn}>Sign Up</button>
          <button onClick={handleSignIn}>Log In</button>
        </div>
      </section>
    </>
  )
}

export default LandingPage
