import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IfAuthenticated } from './Authenticated'
import CreateProfileForm from './CreateProfileForm'
import { useAuth0 } from '@auth0/auth0-react'

export default function Register({ waitBeforeShow = 500 }) {
  const [isShown, setIsShown] = useState(false)
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth0()
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/')
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShown(true)
    }, waitBeforeShow)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <IfAuthenticated>
        {isShown ? <CreateProfileForm /> : null}
      </IfAuthenticated>
    </>
  )
}
