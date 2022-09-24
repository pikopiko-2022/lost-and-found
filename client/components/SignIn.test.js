import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'
import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom'

jest.mock('@auth0/auth0-react')

