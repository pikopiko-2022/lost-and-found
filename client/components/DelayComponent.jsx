import React, { useEffect, useState } from 'react'

export default function DelayComponent({ children, waitBeforeShow = 500 }) {
  const [isShown, setIsShown] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShown(true)
    }, waitBeforeShow)

    return () => clearTimeout(timer)
  }, [])

  return <>{isShown ? children : null}</>
}
