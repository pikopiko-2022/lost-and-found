import React, { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
import CreateProfileForm from './CreateProfileForm'

export default function CreateProfile({ waitBeforeShow = 4000 }) {
  // const user = useSelector((s) => s.loggedInUser)
  // const navigate = useNavigate()
  const [isShown, setIsShown] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShown(true)
    }, waitBeforeShow)

    return () => clearTimeout(timer)
  }, [])

  return <>{isShown ? <CreateProfileForm /> : null}</>
}
