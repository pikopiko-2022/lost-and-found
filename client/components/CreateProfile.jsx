import React, { useEffect, useState } from 'react'

import CreateProfileForm from './CreateProfileForm'

export default function Register({ waitBeforeShow = 500 }) {
  const [isShown, setIsShown] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShown(true)
    }, waitBeforeShow)

    return () => clearTimeout(timer)
  }, [])

  return <>{isShown ? <CreateProfileForm /> : null}</>
}
